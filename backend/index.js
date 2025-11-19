const express = require("express");
const cors = require("cors");
const munguRuZalga = require("./munguMnyMuAnd/mungu.js");
const model = require("./munguMnyMuAnd/helber.js");

// Lightweight hardening and compression for smaller payloads
const compression = require("compression");

const app = express();
munguRuZalga();

// CORS with sensible defaults
app.use(cors({ origin: true, credentials: true }));

// Limit JSON payload size to protect memory on large base64 images
app.use(express.json({ limit: "6mb", strict: true }));
app.use(compression());

// Health route
app.get("/", (req, res) => {
  res.json("ok");
});

// Robust error wrapper
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Create/Update best score per user without extra roundtrips
app.post(
  "/score",
  asyncHandler(async (req, res) => {
    const { userid, score, firstname, lastname } = req.body || {};
    if (!userid || typeof score !== "number") {
      return res.status(400).json({ error: "userid and numeric score required" });
    }

    // Upsert the better score only
    const current = await model.ScoreModel.findOne({ userid }).lean();
    const payload = {
      userid,
      score: current ? Math.max(current.score ?? -Infinity, score) : score,
      firstname: firstname ?? current?.firstname ?? "",
      lastname: lastname ?? current?.lastname ?? "",
    };
    await model.ScoreModel.updateOne({ userid }, { $set: payload }, { upsert: true });

    res.json({ status: "success" });
  })
);

// Read scores sorted on DB side, lean to save memory
app.get(
  "/score",
  asyncHandler(async (_req, res) => {
    const userData = await model.ScoreModel.find({}, null, { sort: { score: 1 } }).lean();
    res.json(userData);
  })
);

// Accept base64 image but enforce size/shape limits to protect memory
app.post(
  "/image",
  asyncHandler(async (req, res) => {
    const { userid, base64, mime } = req.body || {};
    if (!userid || !base64 || typeof base64 !== "string") {
      return res.status(400).json({ error: "userid and base64 string required" });
    }

    // Rough size check: base64 length ~ 1.37x binary size
    const approxBytes = Math.ceil((base64.length * 3) / 4);
    const MAX_BYTES = 4 * 1024 * 1024; // 4MB
    if (approxBytes > MAX_BYTES) {
      return res.status(413).json({ error: "image too large (max 4MB)" });
    }

    await model.PhotoModel.create({ userid, base64, mime: mime || "image/png" });
    res.json({ status: "image stored" });
  })
);

app.get(
  "/image",
  asyncHandler(async (_req, res) => {
    const userData = await model.PhotoModel.find({}, { base64: 0 }).sort({ createdAt: -1 }).lean();
    res.json(userData);
  })
);

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  const code = err.statusCode || 500;
  res.status(code).json({ error: err.message || "internal error" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

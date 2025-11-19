const express = require("express");
const cors = require("cors");
const munguRuZalga = require("./munguMnyMuAnd/mungu.js")
const model = require("./munguMnyMuAnd/helber.js");

const app = express();
munguRuZalga();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("obso");
});

app.post("/score", async (req, res) => {
  const defaultJson = await model.ScoreModel.find({ userid: req.body.userid });
  await model.ScoreModel.deleteOne({ userid: req.body.userid });
  if (defaultJson.length > 0) {
    await model.ScoreModel.create(
      defaultJson[0].score > req.body.score ? req.body : defaultJson[0]
    );
  } else {
    await model.ScoreModel.create(req.body);
  }
  res.json("success");
});

app.get("/score", async (req, res) => {
  const userData = await model.ScoreModel.find();
  userData.sort((a, b) => a.score - b.score);
  res.json(userData);
});

app.post("/image", async (req, res) => {
  await model.PhotoModel.create(req.body);
  res.json("image sent successfully");
});

app.get("/image", async (req, res) => {
  const userData = await model.PhotoModel.find();
  res.json(userData);
});
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

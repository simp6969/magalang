const express = require("express");
const cors = require("cors");
const munguRuZalga = require("./munguMnyMuAnd/mungu");
const model = require("./munguMnyMuAnd/helber.js");

const app = express();
munguRuZalga();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("obso");
});

app.post("/score", async (req, res) => {
  await model.ScoreModel.create(req.body)
    .then(() => res.json("data writed successfully"))
    .catch((e) => console.log(e));
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

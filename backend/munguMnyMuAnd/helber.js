const { model, Schema } = require("mongoose");

const Score = new Schema({
  score: Number,
  firstname: String,
  lastname: String,
  userid: String,
});

const Photo = new Schema({
  userid: String,
  base64: String,
});

const ScoreModel = model("Score", Score);
const PhotoModel = model("Photo", Photo);

module.exports = { PhotoModel, ScoreModel };

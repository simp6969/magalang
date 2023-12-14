const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
});

const PhotoSchema = new Schema({
  path: String,
  click: String,
  id: Number,
  solved: String,
});

const ScoreSchema = new Schema({
  username: String,
  highscore: String,
});

const PhotoModel = model("photos", PhotoSchema);
const UserModel = model("users", UserSchema);
const ScoreModel = model("score", ScoreSchema);

module.exports = { UserModel, ScoreModel, PhotoModel };

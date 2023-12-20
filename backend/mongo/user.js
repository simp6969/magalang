const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
});

const ScoreSchema = new Schema({
  username: String,
  highscore: String,
});

const PhotoSchema = new Schema({
  base64: String,
  username: String,
  originalPath: String,
});

const PhotoModel = model("photo", PhotoSchema);
const UserModel = model("users", UserSchema);
const ScoreModel = model("score", ScoreSchema);

module.exports = { UserModel, ScoreModel, PhotoModel };

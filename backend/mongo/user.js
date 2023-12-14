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

const UserModel = model("users", UserSchema);
const ScoreModel = model("score", ScoreSchema);

module.exports = { UserModel, ScoreModel };

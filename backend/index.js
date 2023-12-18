const connectMongo = require("./mongo/mongodb.js");
const express = require("express");
const cors = require("cors");
const userModel = require("./mongo/user.js");
const app = express();

connectMongo();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("backend working properly");
});

app.post("/user", (req, res) => {
  const body = req.body;
  const model = {
    username: body.username,
    password: body.password,
    firstname: body.firstname,
    lastname: body.lastname,
  };
  userModel.UserModel.create(model);
  res.status(200).json(model);
});

app.get("/users", async (req, res) => {
  const userData = await userModel.UserModel.find();
  res.status(200).json({ userData });
});

app.get("/user/:username", async (req, res) => {
  const { username } = req.params;
  const userData = await userModel.UserModel.find();
  const filt = userData.filter((element) => {
    if (element.username == username) {
      return element;
    }
  });
  res.json(filt);
});

app.get("/users/highscore", async (req, res) => {
  const userData = await userModel.ScoreModel.find();
  res.status(200).json({ userData });
});

app.post("/user/highscore", async (req, res) => {
  if (req.body.username === undefined || req.body.username === "") {
    res.send("zl");
  }
  const model = {
    username: req.body.username,
    highscore: req.body.highscore,
  };
  const rawUserData = await userModel.ScoreModel.find();
  const userData = rawUserData[0];

  function hasDupe() {
    if (userData.username === model.username) {
      function muchHigherScore(num1, num2) {
        if (num1 < num2) {
          return num2;
        } else {
          return num1;
        }
      }
      return {
        username: userData.username,
        highscore: muchHigherScore(userData.highscore, model.highscore),
      };
    } else {
      return model;
    }
  }
  await userModel.ScoreModel.deleteOne({ username: model.username });
  await userModel.ScoreModel.create(hasDupe());

  res.send(hasDupe());
});

app.post("/user/photo", (req, res) => {
  const body = req.body;
  const model = {
    base64: body.base64,
    username: body.username,
  };
  userModel.PhotoModel.create(model);
  res.json(model);
});

app.get("/user/photo/:username", async (req, res) => {
  const { username } = req.params;
  const result = await userModel.PhotoModel.find();
  // const result = await userModel.PhotoModel.findOneAndUpdate(
  //   { name: "bob" },
  //   { name: "John" }
  // );
  const filt = result.filter((element) => element.username === username);
  res.json(filt);
});

app.listen(8080);
// [
//     {
//       path: body.path,
//       clicked: body.clicked,
//       id: body.id,
//       solved: body.solved,
//     },
//   ];

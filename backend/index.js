const connectMongo = require("./mongo/mongodb.js");
const express = require("express");
const cors = require("cors");
var compression = require("compression");
const userModel = require("./mongo/user.js");
const fs = require("fs");
var fileupload = require("express-fileupload");
const app = express();

connectMongo();
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(fileupload());

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
  const model = [
    {
      base64: body.base64,
      username: body.username,
      originalPath: body.originalPath,
    },
  ];
  // userModel.PhotoModel.create(model);
  fs.readFile("./data/images.json", (err, data) => {
    const raw = JSON.parse(data);
    console.log(raw);
    raw.map((element) => {
      model.push(element);
    });
    fs.writeFile(
      "./data/images.json",
      [JSON.stringify(model), JSON.stringify(raw)],
      () => {}
    );
  });
  res.json(model);
});

app.get("/user/photo/:username", async (req, res) => {
  const { username } = req.params;
  const result = await userModel.PhotoModel.find();
  const filt = result.filter((element) => element.username === username);
  res.json(filt);
});

app.listen(8080);

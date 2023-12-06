var jwt = require("jsonwebtoken");
var token = jwt.sign({ username: "ariuka" }, "sha2");
console.log(token);

var decoded = jwt.verify(token, "sha2");
console.log(decoded.username);

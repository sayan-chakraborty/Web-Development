const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/", (req, res) => {
  var w = Number(req.body.w);
  var h = Number(req.body.h);
  var result = w/(h*h);
  console.log(result);
  res.send(String(result));
});

app.listen(port, () => {
  console.log("Server started at port " + port);
});

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=60f4316a6273f6f56c8795047573e6bc&units=metric";
  https.get(url, (response) => {
    response.on('data', (d) => {
      const weatherData = JSON.parse(d);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      res.write("<p>The weather description is " + description + ".</p>");
      res.write("<h1>Temperature is " + temp + " degree Celcius.</h1>");
      res.write('<img src="http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png">');
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const {
  Howl,
  Howler
} = require('howler');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  var pincode = req.body.pincode;
  var date = req.body.date;
  var url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pincode + "&date=" + date;

  function rep(pincode, url, date) {
    https.get(url, (response) => {
      response.on('data', (d) => {
        var vaccineData = JSON.parse(d);
        var nameList = [];
        var ageList = [];
        var vaccineTypeList = [];
        var path = __dirname + "/result.html";
        var i, j;
        for (i = 0; i < vaccineData.sessions.length; i++) {
          nameList.push(vaccineData.sessions[i].name);
          ageList.push(vaccineData.sessions[i].min_age_limit);
          vaccineTypeList.push(vaccineData.sessions[i].vaccine);
        }
        res.write('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="description" content=""><meta name="author" content=""><link rel="icon" href="/docs/4.0/assets/img/favicons/favicon.ico"><title>Cowin Unofficial</title><link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/sign-in/"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><link href="css/styles.css" rel="stylesheet"></head><body class="text-center"><div class="list-group">');
        for (j = 0; j < i; j++) {
          res.write('<a href="#" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + nameList[j] + '</h5> <small>' + ageList[j] + '</small></div><p class="mb-1">' + vaccineTypeList[j] + '</p> <small>Take the vaccine as soon as possible.</small> </a>');
        }
        res.write('</div></body></html>');
        res.send();
      });
    });
  }
  setInterval(() => rep(pincode, url, date), 1000);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});

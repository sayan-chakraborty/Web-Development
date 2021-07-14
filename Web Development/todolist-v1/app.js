const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = [];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {

  res.render("list", {listTitle: date.getDate(), newListItems: items});
});

app.post("/", (req, res) => {
  item = req.body.newItem;
  if(req.body.list === "Work")
  {
    workItems.push(item);
    res.redirect("/work");
  }
  else
  {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", {listTitle: "Work List", newListItems: workItems})
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});

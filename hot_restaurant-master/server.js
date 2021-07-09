var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [];
var waitlist = [];

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/api/tables", function (req, res) {
  return res.json(reservations);
});

app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});

app.post("/api/clear", function (req, res) {
  reservations = [];
  waitlist = [];
});

app.post("/api/new", function (req, res) {
  console.log("Works");

  var newCustomer = req.body;
  if (reservations.length >= 5) {
    waitlist.push(newCustomer);
  } else {
    reservations.push(newCustomer);
  }
  res.json(newCustomer);
});

app.listen(port, function () {
  console.log("App listening on PORT " + port);
});


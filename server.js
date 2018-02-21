var express = require("express");
var bodyParser = require("body-parser");
var createsend = require('createsend-node');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Middleware
app.use(function(req, res, next) {
  // Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/static/css", express.static(__dirname + "/static/css"));
app.use("/static/scss", express.static(__dirname + "/static/scss"));
app.use("/static/js", express.static(__dirname + "/static/js"));
app.use("/static/img", express.static(__dirname + "/static/img"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// LOGIC
app.get("/sumbit-email", function(request, res) {

  var email = request.query.email;
  var timeStamp = Date.now();

  var auth = { apiKey: '09686596862e7008d4d49fb8ce5a8bded64d359a8a45df28' }; // STAB MAG..
  var api = new createsend(auth);
  // var listId = '2796008581b24e1fe52749417077d341' // Stab Dev..
  var listId = 'a97d188f482a20aaeb1c3f1156d8f4e0' // StabMag
  var details = {
    EmailAddress: email
  };

  api.subscribers.addSubscriber(listId, details, (err, res) => {
    if (err) console.log(err);
  });


  res.end("successful");
});


app.listen(process.env.PORT || 8082, function() {
  console.log("Listening on port 8082!");
});

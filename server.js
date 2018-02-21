var express = require("express");
var bodyParser = require("body-parser");
var createsend = require('createsend-node');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 8082, function() {
  console.log("Listening on port 8082!");
});

app.use("/static/css", express.static(__dirname + "/static/css"));
app.use("/static/scss", express.static(__dirname + "/static/scss"));
app.use("/static/js", express.static(__dirname + "/static/js"));
app.use("/static/img", express.static(__dirname + "/static/img"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// LOGIC
app.post("/sumbit-email", function(request, res) {
  var email = request.body.email;
  var timeStamp = Date.now();

  var auth = { apiKey: '09686596862e7008d4d49fb8ce5a8bded64d359a8a45df28' }; // STAB MAG..
  var api = new createsend(auth);
  var listId = '2796008581b24e1fe52749417077d341' // Stab Dev..
  var details = {
    EmailAddress: email
  };

  api.subscribers.addSubscriber(listId, details, (err, res) => {
    if (err) console.log(err);
  });


  res.end("successful");
});

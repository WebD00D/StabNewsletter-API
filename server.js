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


// SURF CLUB LA

app.get("/welcome-to-surfclub", function(request, res){

  var postmark = require("postmark");
  var client = new postmark.Client("5e363e6d-f69d-4211-9f6c-35771e996574");

  var email = request.query.email;

  client.sendEmail({
      From: "christian@stabmag.com",
      To: email + " rva.christian91@gmail.com",
      Subject: "Welcome to Surf Club LA",
      TextBody: "Welcome to Surf Club LA - stoked your here."
  });

    res.end("successful");


})

// END SURF CLUB LA

// STAB TRAVEL..

app.get("/send-travel-guide-notification", function(req, res){

  var postmark = require("postmark");
  var client = new postmark.Client("a273781c-cb06-4d6e-b335-b923211a4673");

  client.sendEmail({
      From: "christian@stabmag.com",
      To: "christian@rollingyouth.com, morgan@stabmag.com, ashton@stabmag.com",
      Subject: "New Stab Travel Submission",
      TextBody: "Someone has submitted a travel guide! Visit the Stab Travel Dashboard to view it at https://stab-travel-dashboard.netlify.com/"
    });

})


app.get("/send-house-you-built-notification", function(request, res){

  var postmark = require("postmark");
  var client = new postmark.Client("a273781c-cb06-4d6e-b335-b923211a4673");

  var name = request.query.name;
  var email = request.query.email;
  var title = request.query.title;
  var shareLink = request.query.shareLink;
  var anythingElse = request.query.comment;

  var message =
    "Name: " + name + " \n" +
    "Email: " + email + " \n" +
    "Project Title: " + title + " \n" +
    "Share Link: " + shareLink + " \n" +
    "Comments: " + anythingElse + " \n";


  client.sendEmail({
      From: "christian@stabmag.com",
      To: "christian@rollingyouth.com, getus@rollingyouth.com",
      Subject: "New House That You Built Submission",
      TextBody: message
    });

    res.end("successful");


})




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

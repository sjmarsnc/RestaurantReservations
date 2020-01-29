// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var Customer = require("./lib/Customer"); 
var http = require("http");  

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tablesList = [];  // array of customers at tables 
var waitList = [];    // array of customers on waitlist 
var customercount = 0;  // increment for each customer to become id 

// What a customer object looks like 
//   { 
//   customerName: "name", 
//   customerPhone: "nnn-nnn-nnnn",
//   customerEmail: "email@gmail.com",
//   customerID: id
//  }


var server = http.createServer(handleRequest);

function handleRequest(req, res) {

  // Saving the request data as a variable
  var requestData = "";

  // When the server receives data...
  req.on("data", function(data) {

    // Add it to requestData.
    requestData += data;
  });

  // When the request has ended...
  req.on("end", function() {

    // Log (server-side) the request method, as well as the data received!
    console.log("You did a", req.method, "with the data:\n", requestData);
    res.end();
  });

}

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function (req, res) { 
   console.log ("/api/tables called."); 
   console.log(tablesList); 
   return res.json(tablesList); 
});

app.get("/api/wait", function (req, res) { 
  console.log ("/api/wait called."); 
  console.log(waitList);  
  return res.json(waitList); 
});

app.get("/api/clear", function (req, res) { 
  console.log ("/api/clear called."); 
  tablesList.length = 0; ; 
  waitList.length = 0;  
  return res.json( {msg: "Lists have been cleared."}); 
});



// new reservation  - takes in JSON input
app.post("/api/reserve", function(req, res)  {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newCustomer = req.body;
    console.log(req.body);  
    const { name, email, phone }  = req.body; 
    newCustomer = new Customer (name, phone, email);  

    if (tablesList.length < 5) { 
        tablesList.push(newCustomer); 
        return "You have a table!"; 
    }
    else { 
      waitList.push(newCustomer); 
      return `You are in position ${waitList.length -1} on the waitlist.`;
    }    

  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
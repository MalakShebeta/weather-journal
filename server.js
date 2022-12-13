// Setup empty JS object to act as endpoint for all routes
let projectData = {}; //its a variable to save the data in it , and we used let because we will make changes to it.

// Require Express to run server and routes
// The packages we need.
  const express = require("express");
  const bodyParser = require("body-parser");
  const cors = require("cors"); //handles the requests ( the ports) going to the backend to the frontend.
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false })); //its use to handle the data from the clien to the server and vice versa.
app.use(bodyParser.json());

// Cors for cross origin allowance
 app.use(cors());

// Initialize the main project folder
app.use(express.static('website')); // its used to links files together.
const port = 8000;
// Setup Server
app.listen(port , () =>
console.log(`server is running successfully at http://localhost:${port}`)
);
// Get request 
 app.get("/getData", (req,res)=>{
  res.send(projectData);
  console.log(projectData);
  });
// Post request , to let the client send data to server
app.post("/addData" , (req,res)=>{
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.content = req.body.content;
  res.send(projectData);
});
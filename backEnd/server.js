const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/users")
const createAPIKey = require('./models/APIKey');
const cors=require('cors');
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());


app.use(cors());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  res.send({ message: "Welcome page." });
});

// insert new users
app.post("/user", (req,res)=>{
  // Validate request
  if (!req.body) {
       res.status(400).send({
         message: "Content can not be empty!"
       });
     }
   console.log("====================== body post from user request: ", req.body)
   // create API Key:
    let APIKey = createAPIKey(req.body.email)
     // Create a Customer
     const user = new User({
       name: req.body.email,
       score: req.body.promo
     });

     // Save Customer in the database
     User.create(user, (err, data) => {
       if (err)
         res.status(500).send({
           message:
             err.message || "line 23, controller.js, Some error occurred while creating the Customer."
         });
       else res.send(data);
     });


});


// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/users")
const VancouverRestaurant = require("./models/VanRestaurants")
const BurnabyRestaurant = require("./models/burnabyRestaurant")
const creatJWTToken = require('./models/APIKey');
const cors=require('cors');
const app = express();
let jwt = require('jsonwebtoken');
// parse requests of content-type: application/json
app.use(bodyParser.json());


app.use(cors());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  res.send({ message: "Welcome page." });
});
// =================================================================== User section ================================================

// insert new users
app.post("/user", (req,res)=>{
  // Validate request
  if (!req.body) {
       res.status(400).send({
         message: "Content can not be empty!"
       });
     }

  //console.log("test sdiid", User.checkUser(req.body.email))

  if (User.checkUser(req.body.email)== true){
    res.send("Sorry, that Email has already registered, try another email !!")
  }
   // create API Key:
    let JWT_Token = creatJWTToken(req.body.email,req.body.promo)
    console.log("JWT: ",JWT_Token)

     // Create a Customer
     const user = new User({
       email: req.body.email,
       promo: req.body.promo,
        token: JWT_Token
     });

     // Save Customer in the database -> call User.create() in user.js
     User.create(user, (err, data) => {
       if (err)
         res.status(500).send({
           message:
             err.message || "line 23, controller.js, Some error occurred while creating the Customer."
         });
       else
       // send it back to front end
       res.send({token:JWT_Token});
     });


});



// Get all users
app.get("/users", (req, res) => {

  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users"
      });
    else res.send(data);
  });
});

// Get one user by ID
app.get("/user/:id", (req, res) => {

  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });

})

// update on a user by ID
app.put("/user/:id",(req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // create API Key:
  let APIKey = creatJWTToken(req.body.email, req.body.promo)

  User.updateById(
    req.params.id,
    new User({token: APIKey,...req.body}),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
})


// delete one by ID
app.delete("/user/:id",(req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
})


// Remove all Users

app.delete("/users",(req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all restaurants."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  })
})


// check JWT Token  + increase - > middle ware check for JWT Token
app.use((req,res,next) => {
  // check JWt Token is
  console.log("in middle ware: ", req.headers)
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT'){

    jwt.verify(req.headers.authorization.split(' ')[1],'MYSECRETKEY',(err, encode)=>{
      if(err){
        return res.status(401).json({message : "Unauthorized user"})

      }else{
          // increase requests
          User.increaseRequest(
            encode.email,
            new BurnabyRestaurant({email:encode.email, promo:encode.email}),
            (err, data) => {
              if (err) {
                if (err.kind === "not_found") {
                  res.status(404).send({
                    message: `Not found Customer with id ${req.params.id}.`
                  });
                } else {
                  res.status(500).send({
                    message: "Error updating Customer with id " + req.params.id
                  });
                }
              } else res.send(data);
            }

          )
          // req.user = encode
          // console.log("server.js, line 70, encode will be: ", encode)
          next()
      }
    })

  }else{
    return res.status(401).json({message : "Unauthorized user"})
  }
})



// ================================================= Vancouver Restaurant section =============================================

// Get all Restaurants
app.get("/vancouverRestaurant", (req, res) => {

  VancouverRestaurant.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
});

// Post -> createone res
app.post("/vancouverRestaurant",(req,res)=>{
  // Validate request
  if (!req.body) {
       res.status(400).send({
         message: "Content can not be empty!"
       });
     }
   console.log("====================== body post from user request: ", req.body)

     // Create a Customer
     const vancouverRestaurant = new VancouverRestaurant({
       name: req.body.name,
       address: req.body.address,
       postal_code: req.body.postal_code,
       status:req.body.status,
       cuisine:req.body.cuisine
     });

     // Save Customer in the database -> call User.create() in user.js
     VancouverRestaurant.create(vancouverRestaurant, (err, data) => {
       if (err)
         res.status(500).send({
           message:
             err.message || "line 23, controller.js, Some error occurred while creating the Customer."
         });
       else res.send(data);
     });


} )


// Get one restaurant by ID
app.get("/vancouverRestaurant/:id", (req, res) => {
  console.log("req.params: ",req.params);
  VancouverRestaurant.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.id
        });
      }
    } else res.send(data);
  });

})

// update on a restaurant by ID
app.put("/vancouverRestaurant/:id",(req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log("req.body in update vanRes===================: ", req.body)
  console.log("req.params in update vanRes===================: ", req.params.id)
  VancouverRestaurant.updateById(
    req.params.id,
    new VancouverRestaurant(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
})


// delete one by ID
app.delete("/vancouverRestaurant/:id",(req, res) => {
  VancouverRestaurant.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Van Restaurant with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Van Restaurant with id " + req.params.id
        });
      }
    } else res.send({ message: `Van restaurant was deleted successfully!` });
  });
})


// Remove all Vancouver Restaurant

app.delete("/vancouverRestaurant",(req, res) => {
  VancouverRestaurant.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all restaurants."
      });
    else res.send({ message: `All Vancouver Restaurant were deleted successfully!` });
  })
})
// ============================================================================================================

// ================================================= Burnaby Restaurant section =============================================

// Get all Restaurants
app.get("/burnabyRestaurant", (req, res) => {

  BurnabyRestaurant.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
});

// Post -> createone res
app.post("/burnabyRestaurant",(req,res)=>{
  // Validate request
  if (!req.body) {
       res.status(400).send({
         message: "Content can not be empty!"
       });
     }
   console.log("====================== body post from user request: ", req.body)

     // Create a Customer
     const burnabyRestaurant = new BurnabyRestaurant({
       name: req.body.name,
       address: req.body.address,
       postal_code: req.body.postal_code,
       status:req.body.status,
       cuisine:req.body.cuisine
     });

     // Save Customer in the database -> call User.create() in user.js
     BurnabyRestaurant.create(burnabyRestaurant, (err, data) => {
       if (err)
         res.status(500).send({
           message:
             err.message || "line 23, controller.js, Some error occurred while creating the Customer."
         });
       else res.send(data);
     });


} )


// Get one restaurant by ID
app.get("/burnabyRestaurant/:id", (req, res) => {
  console.log("req.params: ",req.params);
  BurnabyRestaurant.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.id
        });
      }
    } else res.send(data);
  });

})

// update on a restaurant by ID
app.put("/burnabyRestaurant/:id",(req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log("req.body in update vanRes===================: ", req.body)
  console.log("req.params in update vanRes===================: ", req.params.id)
  BurnabyRestaurant.updateById(
    req.params.id,
    new BurnabyRestaurant(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
})


// delete one by ID
app.delete("/burnabyRestaurant/:id",(req, res) => {
  BurnabyRestaurant.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Van Restaurant with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Van Restaurant with id " + req.params.id
        });
      }
    } else res.send({ message: `Van restaurant was deleted successfully!` });
  });
})


// Remove all Vancouver Restaurant

app.delete("/burnabyRestaurant",(req, res) => {
  BurnabyRestaurant.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all restaurants."
      });
    else res.send({ message: `All Vancouver Restaurant were deleted successfully!` });
  })
})
// ============================================================================================================


// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
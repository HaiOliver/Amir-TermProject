const sql = require("../db.js");

// constructor
const User = function(user) {
  this.email = user.email;
  this.number_of_requests = 0;
  this.promo = user.promo
};


// Increase request
User.increaseRequest = (email, user, result) => {

  // retrieve data in DB
  sql.query("Select * from Users", (err, result, fields)=> {

    if (err) throw err;
    result.find(oneUser => {
      if(oneUser.email===email){

        console.log("Bing go, ++++++++++++++++++++++++++++++++")
        // query update
          sql.query(
            "UPDATE Users SET number_of_requests = ? WHERE email = ?",
            [
              oneUser.number_of_requests + 1,
              email ],
              (error, results, fields) => {
                if (error){
                  return console.error(error.message);
                }
                console.log('Rows affected:', results.affectedRows);
              });


      }
    })
  });





}

// create new user
User.create = (newUser, result) => {
  console.log("user need to insert is ========================:", newUser)
  sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
    // check error
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Line 18, user.js, created user in Db: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};




// find one user
User.findById = (UserId, result) => {
  sql.query(`SELECT * FROM Users WHERE id = ${UserId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};



// get all users
User.getAll = result => {
  sql.query("SELECT * FROM Users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};



// update user by ID
User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE Users SET email = ?, number_of_requests = ?,promo = ? WHERE id = ?",
    [ user.email,

      user.number_of_requests,
      user.promo,
      id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated User: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

// delete user
User.remove = (id, result) => {
  sql.query("DELETE FROM Users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted User with id: ", id);
    result(null, res);
  });
};

//remove all users
User.removeAll = result => {
  sql.query("DELETE FROM Users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Users`);
    result(null, res);
  });
};

module.exports = User;
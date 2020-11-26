const sql = require("../db.js");
var crypto = require('crypto');
// constructor
const User = function(user) {
  this.email = user.email;
  this.token = user.token;
  this.request = user.request;
  this.promo = user.promo
};


// create hashby email -> API key: ======================================
const createAPIKey = (email) =>{
  var mykey = crypto.createCipher('aes-128-cbc', email);
  var mystr = mykey.update('abc', 'utf8', 'hex')
  return mystr += mykey.final('hex');

}


User.create = (newUser, result) => {
  sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created User: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

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

User.updateById = (id, User, result) => {
  sql.query(
    "UPDATE Users SET email = ?, name = ?, active = ? WHERE id = ?",
    [User.email, User.name, User.active, id],
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

      console.log("updated User: ", { id: id, ...User });
      result(null, { id: id, ...User });
    }
  );
};

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
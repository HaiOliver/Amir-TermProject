const sql = require("../db.js");

// constructor
const BurnabyRestaurant = function(burnabyRestaurant) {
  this.name = burnabyRestaurant.name;
  this.address = burnabyRestaurant.address;
  this.postal_code = burnabyRestaurant.postal_code;
  this.status = burnabyRestaurant.status;
  this.cuisine = burnabyRestaurant.cuisine
};


// create new BurnabyRestaurants
BurnabyRestaurant.create = (newBurnabyRestaurant, result) => {
  console.log("BurnabyRestaurant need to insert is ========================:", newBurnabyRestaurant)
  sql.query("INSERT INTO BurnabyRestaurant SET ?", newBurnabyRestaurant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Line 18, BurnabyRestaurant.js, created BurnabyRestaurant in Db: ", { id: res.insertId, ...newBurnabyRestaurant });
    result(null, { id: res.insertId, ...newBurnabyRestaurant });
  });
};

// find one BurnabyRestaurant
BurnabyRestaurant.findById = (BurnabyRestaurantId, result) => {
  sql.query(`SELECT * FROM BurnabyRestaurant WHERE id = ${BurnabyRestaurantId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found BurnabyRestaurant: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found BurnabyRestaurant with the id
    result({ kind: "not_found" }, null);
  });
};

// get all BurnabyRestaurants
BurnabyRestaurant.getAll = result => {
  sql.query("SELECT * FROM BurnabyRestaurant", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("BurnabyRestaurants: ", res);
    result(null, res);
  });
};


// update BurnabyRestaurant by ID
BurnabyRestaurant.updateById = (id, BurnabyRestaurant, result) => {
  console.log(" ************************line 66,vanres.js: Obj: ", BurnabyRestaurant)
  sql.query(
    "UPDATE BurnabyRestaurant SET name = ?, address = ?, postal_code = ?, status = ?, cuisine = ? WHERE id = ?",
    [BurnabyRestaurant.name, BurnabyRestaurant.address, BurnabyRestaurant.postal_code,
    BurnabyRestaurant.status,BurnabyRestaurant.cuisine, id],
    (err, res) => {
      if (err) {
        console.log("error line 84: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found BurnabyRestaurant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated BurnabyRestaurant: ", { id: id, ...BurnabyRestaurant });
      result(null, { id: id, ...BurnabyRestaurant });
    }
  );
};

// delete BurnabyRestaurant
BurnabyRestaurant.remove = (id, result) => {
  sql.query("DELETE FROM BurnabyRestaurant WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found BurnabyRestaurant with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted BurnabyRestaurant with id: ", id);
    result(null, res);
  });
};

//remove all BurnabyRestaurants
BurnabyRestaurant.removeAll = result => {
  sql.query("DELETE FROM BurnabyRestaurant", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} BurnabyRestaurants`);
    result(null, res);
  });
};

module.exports = BurnabyRestaurant;
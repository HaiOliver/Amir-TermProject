const sql = require("../db.js");

// constructor
const VancouverRestaurant = function(vancouverRestaurant) {
  this.email = vancouverRestaurant.email;
  // create API Token

  this.api_key = vancouverRestaurant.api_key;
  this.number_of_requests = 0;
  this.promo = VancouverRestaurant.promo
};


// create new VancouverRestaurants
VancouverRestaurant.create = (newVancouverRestaurant, result) => {
  console.log("VancouverRestaurant need to insert is ========================:", newVancouverRestaurant)
  sql.query("INSERT INTO VancouverRestaurant SET ?", newVancouverRestaurant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Line 18, VancouverRestaurant.js, created VancouverRestaurant in Db: ", { id: res.insertId, ...newVancouverRestaurant });
    result(null, { id: res.insertId, ...newVancouverRestaurant });
  });
};

// find one VancouverRestaurant
VancouverRestaurant.findById = (VancouverRestaurantId, result) => {
  sql.query(`SELECT * FROM VancouverRestaurant WHERE id = ${VancouverRestaurantId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found VancouverRestaurant: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found VancouverRestaurant with the id
    result({ kind: "not_found" }, null);
  });
};

// get all VancouverRestaurants
VancouverRestaurant.getAll = result => {
  sql.query("SELECT * FROM VancouverRestaurant", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("VancouverRestaurants: ", res);
    result(null, res);
  });
};


// update VancouverRestaurant by ID
VancouverRestaurant.updateById = (id, VancouverRestaurant, result) => {
  sql.query(
    "UPDATE VancouverRestaurant SET email = ?, name = ?, active = ? WHERE id = ?",
    [VancouverRestaurant.email, VancouverRestaurant.name, VancouverRestaurant.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found VancouverRestaurant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated VancouverRestaurant: ", { id: id, ...VancouverRestaurant });
      result(null, { id: id, ...VancouverRestaurant });
    }
  );
};

// delete VancouverRestaurant
VancouverRestaurant.remove = (id, result) => {
  sql.query("DELETE FROM VancouverRestaurant WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found VancouverRestaurant with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted VancouverRestaurant with id: ", id);
    result(null, res);
  });
};

//remove all VancouverRestaurants
VancouverRestaurant.removeAll = result => {
  sql.query("DELETE FROM VancouverRestaurant", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} VancouverRestaurants`);
    result(null, res);
  });
};

module.exports = VancouverRestaurant;
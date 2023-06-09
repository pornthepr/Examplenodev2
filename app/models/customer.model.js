const sql = require("./db.js");
// constructor
const Customer = function(customer) {
    this.name = customer.name;
    this.address = customer.address;
    this.country = customer.country;
    this.phone = customer.phone;
};

Customer.getAllCustomers = result => {
    sql.query("SELECT * FROM customer", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Customer: ", res);
      result(null, res);
    });
};

Customer.getCustomerById = (id, result) => {
    sql.query(`SELECT * FROM customer WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found tutorial: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
};

Customer.create = (newCustomer, result)=>{
    sql.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("created customer: ", { id: res.insertId, ...newCustomer });
        result(null, { id: res.insertId, ...newCustomer });
      });
};

Customer.remove = (id, result) => {
    sql.query("DELETE FROM customer WHERE Id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted customer with id: ", id);
      result(null, res);
    });
  };

  Customer.updateById = (id, customer, result) => {
    sql.query(
      "UPDATE customer SET Name = ?, Address = ?, Country = ?, phone = ? WHERE id = ?",
      [customer.name, customer.address, customer.country, customer.phone, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated customer: ", { id: id, ...customer });
        result(null, { id: id, ...customer });
      }
    );
  };

  module.exports = Customer;
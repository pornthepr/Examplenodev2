const Customer = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    // Create a Tutorial
    const customer = new Customer({
        name: req.body.name,
        address: req.body.address,
        country: req.body.country,
        phone: req.body.phone
    });
    // Save Tutorial in the database
    Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Customer.getAllCustomers((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Customers."
        });
      else res.send(data);
    });    
};

// Find a single Customer with a id
exports.findOne = (req, res) => {
    Customer.getCustomerById(req.params.id, (err, data) => {
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
};

// Update a Customer identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Customer.updateById(req.params.id, new Customer(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Tutorial with id " + req.params.id
                });
            }
        } else res.send(data);
    }
  );
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
    Customer.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.id
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
      });
};
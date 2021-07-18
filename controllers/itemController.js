// Item model
const Item = require("../models/item");

// Full item list
exports.item_list = (req, res) => {
  res.send("todo: item list");
};

// Specific item details
exports.item_detail = (req, res) => {
  res.send("todo: item details");
};

// Function that displays create item form on a get request
exports.item_create_get = (req, res) => {
  res.send("todo: get- create item form");
};

// Function to handle POST request from create item form
exports.item_create_post = (req, res) => {
  res.send("todo: handle post request (create new item");
};

// Function that displays delete form on GET
exports.item_delete_get = (req, res) => {
  res.send("todo: get - delete item form");
};

// Function that handles POST request from delete item form
exports.item_delete_post = (req, res) => {
  res.send("todo: handle post request (delete item specified in req");
};

// GET request - update item form
exports.item_update_get = (req, res) => {
  res.send("todo: get - update item form");
};

// POST request - update item form
exports.item_update_post = (req, res) => {
  res.send("todo: POST - update item form");
};

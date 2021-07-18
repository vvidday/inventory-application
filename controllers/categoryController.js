// Category model
const category = require("../models/category");

//Function to display all categories
// although it's a middleware function, we don't need next since we're ending the request here since we send back (res.send)
exports.category_list = (req, res) => {
  res.send("todo: category list");
};

//Function to display specific category details (ID)
exports.category_detail = (req, res) => {
  res.send("todo: detail of specific category");
};

// Function that displays create category form on a get request
exports.category_create_get = (req, res) => {
  res.send("todo: get- create category form");
};

// Function to handle POST request from create category form
exports.category_create_post = (req, res) => {
  res.send("todo: handle post request (create new category");
};

// Function that displays delete form on GET
exports.category_delete_get = (req, res) => {
  res.send("todo: get - delete category form");
};

// Function that handles POST request from delete category form
exports.category_delete_post = (req, res) => {
  res.send("todo: handle post request (delete category specified in req");
};

// GET request - update category form
exports.category_update_get = (req, res) => {
  res.send("todo: get - update category form");
};

// POST request - update category form
exports.category_update_post = (req, res) => {
  res.send("todo: POST - update category form");
};

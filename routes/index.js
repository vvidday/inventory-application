var express = require("express");
var router = express.Router();

const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Category routes

//Home page - list of all categories
router.get("/categories", category_controller.category_list);

//GET - create form (NOTE: need to be before any :id, since if not, express will treat the create as the :id, and this route will never be reached)
router.get("/categories/create", category_controller.category_create_get);

//POST - create form
router.post("/categories/create", category_controller.category_create_post);

//GET - delete form
router.get("/categories/delete/:id", category_controller.category_delete_get);

//POST - delete form
router.post("/categories/delete/:id", category_controller.category_delete_post);

//GET - update form
router.get("/categories/update/:id", category_controller.category_update_get);

//POST - update form
router.post("/categories/update/:id", category_controller.category_update_post);

//GET - detail of specific category (use id)
router.get("/categories/:id", category_controller.category_detail);

// Item routes

//Home page - list of all items
router.get("/items", item_controller.item_list);

//GET - create form (NOTE: need to be before any :id, since if not, express will treat the create as the :id, and this route will never be reached)
router.get("/items/create", item_controller.item_create_get);

//POST - create form
router.post("/items/create", item_controller.item_create_post);

//GET - delete form
router.get("/items/delete/:id", item_controller.item_delete_get);

//POST - delete form
router.post("/items/delete/:id", item_controller.item_delete_post);

//GET - update form
router.get("/items/update/:id", item_controller.item_update_get);

//POST - update form
router.post("/items/update/:id", item_controller.item_update_post);

//GET - detail of specific item (use id)
router.get("/items/:id", item_controller.item_detail);

module.exports = router;

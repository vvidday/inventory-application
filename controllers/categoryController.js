// Category model
const category = require("../models/category");
//Item model
const Item = require("../models/item");

// body and validationResult functions from express-validator library
// We use body since we're validating/sanitising POST requests, which hold the information in the body attribute.
const { body, validationResult } = require("express-validator");

//Function to display all categories
// although it's a middleware function, we don't need next since we're ending the request here since we send back (res.send)
exports.category_list = async (req, res, next) => {
  try {
    const list_categories = await category.find({}, "name").exec();
    res.render("list", {
      type: "Categories",
      list: list_categories,
      title: "Category List",
    });
  } catch (err) {
    return next(err);
  }
};

//Function to display specific category details (ID)
exports.category_detail = async (req, res, next) => {
  try {
    const [category_item, related_items] = await Promise.all([
      category.findById(req.params.id).exec(),
      Item.find({ category: req.params.id }).exec(),
    ]);
    res.render("categorydetail", {
      category: category_item,
      related_items: related_items,
      title: category_item.name,
    });
    //todo: Render template + modify to list all items of this category (query items)
  } catch (err) {
    return next(err);
  }
};

// Function that displays create category form on a get request
exports.category_create_get = (req, res) => {
  res.render("createcategory", { title: "Create Category" });
};

// Function to handle POST request from create category form
exports.category_create_post = [
  //trim() gets rid of trailing & leading whitespace. After trimming, we verify if the length is >= 1 (To avoid '   ' whitespace submissions). escape() replaces HTML special characeters(>, < etc)
  body("name", "Name required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("createcategory", {
        title: "Create Category",
        errors: errors.array(),
      });
    } else {
      //Check if a category with the same name already exists
      try {
        const result = await category.findOne({ name: req.body.name });
        if (result) {
          res.redirect(result.url);
        } else {
          const cat = new category({
            name: req.body.name,
            description: req.body.description,
          });
          try {
            const saveCat = await cat.save();
            res.redirect(cat.url);
          } catch (err) {
            return next(err);
          }
        }
      } catch (err) {
        return next(err);
      }
    }
  },
];

// Function that displays delete form on GET
exports.category_delete_get = async (req, res, next) => {
  try {
    const category_item = await category.findById(req.params.id).exec();
    if (!category_item) {
      res.redirect("/categories");
    } else {
      try {
        const affected_items = await Item.find({
          category: req.params.id,
        }).exec();
        res.render("deletecategory", {
          category: category_item,
          affected_items: affected_items,
          title: `Delete ${category_item.name}`,
        });
      } catch (err) {
        return next(err);
      }
    }
  } catch (err) {
    return next(err);
  }
};

// Function that handles POST request from delete category form
exports.category_delete_post = async (req, res, next) => {
  try {
    const category_item = await category.findById(req.body.id).exec();
    if (category_item.length === 0) res.redirect("/categories");
    else {
      try {
        const affected_items = await Item.find({
          category: req.body.id,
        }).exec();
        if (affected_items.length > 0) {
          res.render("deletecategory", {
            category: category_item,
            affected_items: affected_items,
            title: `Delete ${category_item.name}`,
          });
        } else {
          try {
            const result = await category.findByIdAndRemove(req.body.id);
            res.redirect("/categories");
          } catch (err) {
            return next(err);
          }
        }
      } catch (err) {
        return next(err);
      }
    }
  } catch (err) {
    return next(err);
  }
};

// GET request - update category form
exports.category_update_get = async (req, res, next) => {
  try {
    const category_item = await category.findById(req.params.id);
    if (!category_item) {
      res.redirect("/categories");
    } else {
      res.render("updatecategory", {
        category: category_item,
        title: `Update ${category_item.name}`,
      });
    }
  } catch (err) {
    return next(err);
  }
};

// POST request - update category form
exports.category_update_post = [
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const new_category = new category({
      name: req.body.name,
      description: req.body.description,
      _id: req.body.id,
    });
    if (!errors.isEmpty()) {
      res.render("updatecategory", {
        category: new_category,
        title: "Update Category",
      });
    } else {
      try {
        const old = await category.findByIdAndUpdate(req.body.id, new_category);
        res.redirect(old.url);
      } catch (err) {
        return next(err);
      }
    }
  },
];

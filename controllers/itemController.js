// Item model
const Item = require("../models/item");

//Category model
const category = require("../models/category");

//express-validator functions
const { body, validationResult } = require("express-validator");

// Full item list
exports.item_list = async (req, res, next) => {
  try {
    const list_items = await Item.find().exec();
    res.render("list", { list: list_items, title: "Item List", type: "Items" });
  } catch (err) {
    return next(err);
  }
};

// Specific item details
exports.item_detail = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id).populate("category").exec();
    if (!item) {
      res.redirect("/items");
    } else {
      res.render("itemdetail", {
        item: item,
        title: item.name,
        category: item.category,
      });
    }
  } catch (err) {
    return next(err);
  }
};

// Function that displays create item form on a get request
exports.item_create_get = async (req, res, next) => {
  try {
    const categories = await category.find().exec();
    res.render("itemcreate", { title: "Create Item", categories: categories });
  } catch (err) {
    return next(err);
  }
};

// Function to handle POST request from create item form
exports.item_create_post = [
  body("name", "Name required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category required").trim().isLength({ min: 1 }).escape(),
  body("price", "Price should be a number between 0.01 and 9999")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isFloat({ min: 0.01, max: 9999 }),
  body("stock", "Stock should be an integer between 0 and 9999")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isInt({ min: 0, max: 9999 }),
  body("image", "Image URL required").trim().isLength({ min: 1 }),
  async (req, res, next) => {
    try {
      const [existing, categories] = await Promise.all([
        Item.findOne({ name: req.body.name }).exec(),
        category.find({}).exec(),
      ]);
      if (existing) {
        res.redirect(existing.url);
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.render("itemcreate", {
            title: "Create Item",
            categories: categories,
            itemname: req.body.name,
            itemdescription: req.body.description,
            itemprice: req.body.price,
            itemstock: req.body.stock,
            itemimage: req.body.image,
            errors: errors.array(),
          });
        } else {
          try {
            const new_item = new Item({
              name: req.body.name,
              description: req.body.description,
              category: req.body.category,
              price: req.body.price,
              stock: req.body.stock,
              image: req.body.image,
            });
            console.log(req.body.image);
            new_item
              .save()
              .then(() => res.redirect(new_item.url))
              .catch((err) => next(err));
          } catch (err) {
            return next(err);
          }
        }
      }
    } catch (err) {
      return next(err);
    }
  },
];

// Function that displays delete form on GET
exports.item_delete_get = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id).exec();
    if (!item) {
      res.redirect("/items");
    } else {
      res.render("deleteitem", { title: `Delete ${item.name}`, item: item });
    }
  } catch (err) {
    return next(err);
  }
};

// Function that handles POST request from delete item form
exports.item_delete_post = async (req, res, next) => {
  try {
    const item = await Item.findById(req.body.id).exec();
    if (!item) {
      res.redirect("/items");
    } else {
      Item.findByIdAndRemove(req.body.id).then(() => res.redirect("/items"));
    }
  } catch (err) {
    return next(err);
  }
};

// GET request - update item form
exports.item_update_get = async (req, res, next) => {
  try {
    const [item, categories] = await Promise.all([
      Item.findById(req.params.id).populate("category").exec(),
      category.find().exec(),
    ]);
    if (!item) {
      res.redirect("/items");
    } else {
      res.render("updateitem", {
        item: item,
        categories: categories,
        title: `Update ${item.name}`,
      });
    }
  } catch (err) {
    return next(err);
  }
};

// POST request - update item form
exports.item_update_post = [
  body("name", "Name required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category required").trim().isLength({ min: 1 }).escape(),
  body("price", "Price should be a number between 0.01 and 9999")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isFloat({ min: 0.01, max: 9999 }),
  body("stock", "Stock should be an integer between 0 and 9999")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isInt({ min: 0, max: 9999 }),
  body("image", "Image URL required").trim().isLength({ min: 1 }),
  async (req, res, next) => {
    try {
      const [item, categories] = await Promise.all([
        Item.findById(req.body.id).populate("category").exec(),
        category.find({}).exec(),
      ]);
      if (!item) {
        res.redirect("/items");
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.render("updateitem", {
            item: item,
            categories: categories,
            title: `Update ${item.name}`,
            errors: errors.array(),
          });
        } else {
          try {
            const new_item = new Item({
              name: req.body.name,
              description: req.body.description,
              category: req.body.category,
              price: req.body.price,
              stock: req.body.stock,
              image: req.body.image,
              _id: req.body.id,
            });
            Item.findByIdAndUpdate(req.body.id, new_item)
              .then((old) => res.redirect(old.url))
              .catch((err) => next(err));
          } catch (err) {
            return next(err);
          }
        }
      }
    } catch (err) {
      return next(err);
    }
  },
];

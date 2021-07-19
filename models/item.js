const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true, maxLength: 200 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, min: 0, required: true },
  stock: { type: Number, min: 0, required: true },
  image: { type: String, required: true },
});

// Virtual for Item URL
ItemSchema.virtual("url").get(function () {
  return `/items/${this._id}`;
});

//Export model
module.exports = mongoose.model("Item", ItemSchema);

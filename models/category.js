let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true, maxLength: 200 },
  image: { type: String, required: true },
});

//Virtual for category's URL
CategorySchema.virtual("url").get(function () {
  return `/categories/${this._id}`;
});

// Export model
module.exports = mongoose.model("Category", CategorySchema);

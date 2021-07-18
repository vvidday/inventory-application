let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true, maxLength: 200 },
});

//Virtual for category's URL

// Export model
module.exports = mongoose.model("Category", CategorySchema);

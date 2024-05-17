const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stockQuantity: { type: Number, required: true },
  imageURL: { type: String, required: true },
  video: { type: String, required: true },
  rating:{type:Number,required:true},
   
});

const ProductModel = model("product", ProductSchema);

module.exports = ProductModel;

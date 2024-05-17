const express = require("express");
const  ProductModel = require("../models/products");
const UserModel = require("../models/user")



const router = express.Router()

router.get("/", async (_, res) => {
  try {
    const products = await ProductModel.find({});
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id",async(req,res)=>{
  try {
    const {id} = req.params
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/cart-items/:customerID",async (req, res) => {
  const { customerID } = req.params;
  try {
    const user = await UserModel.findById(customerID);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const products = await ProductModel.find({
      _id: { $in: user.cartItem },
    });
    res.json({ cartItem: products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router

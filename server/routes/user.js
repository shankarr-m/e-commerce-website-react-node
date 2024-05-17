const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();
const UserModel = require("../models/user");
const UserErrors = require("../common/error");

router.post("/register", async (req, res) => {
  const { name, email,phno,password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({ message : "user_already_exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({name,email,phno,password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
  
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ message : "user_not_found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ message :"check_password" });
    }
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id ,message : "login_success" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

router.post('/addcart', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    
    const user = await UserModel.findOneAndUpdate({ _id: userId }, { $push: { cartItem: productId } }, { new: true });

    if (!user) {
      return res.json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.put('/user/:userId/address', async (req, res) => {
  const { userId } = req.params;
  const { name, email, phno, address, state, city } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new address object
    const newAddress = {
      name: name,
      email: email,
      phno: phno,
      address:address,
      state: state,
      city: city
    };

    // Push the new address to the addresses array
    user.addresses.push(newAddress);

    // Save the updated user
    await user.save();

    res.json({ message: 'Address added successfully', address: newAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Define the route for fetching user addresses
router.get('/user/:userId/addresses', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID and only select the addresses field
    const user = await UserModel.findById(userId).select('addresses');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

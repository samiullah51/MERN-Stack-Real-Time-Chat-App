const User = require("../Models/User");
const JWT = require("jsonwebtoken");
const router = require("express").Router();
const CryptoJS = require("crypto-js");

// Register a  New User
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,

    // Incrypt the user password using CryptoJS
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    profile: req.body.profile,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Login a User
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("User not found");

    // Decrypt the user password again to its origional form
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const realPassword = await hashedPassword.toString(CryptoJS.enc.Utf8);
    realPassword !== req.body.password &&
      res.status(401).json("Invalid Credentials");

    // Create JWT Token for Authentication
    const token = JWT.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;

    // Save the created token in header by the name of auth-token, to get it later by it's name
    res.header("auth-token", token).send({ ...others, token });
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports = router;

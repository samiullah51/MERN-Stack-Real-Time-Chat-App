const User = require("../Models/User");

const router = require("express").Router();

// get All the registered users
router.get("/users", async (req, res) => {
  try {
    let allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(err.message);
  }
});

// get a use with the help of a query parameter
router.get("/user", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports = router;

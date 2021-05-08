const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requiredLogin = require("../Middleware/requiredlogin");
const User = mongoose.model("User");

router.post("/createpost", requiredLogin, (req, res) => {
  const { type, score } = req.body;

  const data = {
    game: type,
    score: parseInt(score),
  };

  if (!type || !score) {
    return res.status(422).json({ error: "Please fill title and body both " });
  }
  req.user.password = undefined;

  User.findByIdAndUpdate(
    req.user._id,
    { $push: { scores: data } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      return res.json(result);
    }
  });
});

module.exports = router;

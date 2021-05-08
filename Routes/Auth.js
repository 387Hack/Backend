const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const requiredLogin = require("../Middleware/requiredlogin");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/protected", requiredLogin, (req, res) => {
  res.send("We are in protected page");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(404).json({ error: "Please! Fill all the fields" });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(404)
          .json({ error: "User Already Exist With That Email" });
      }

      bcrypt.hash(password, 12).then((hashPassword) => {
        const user = new User({
          name,
          email,
          password: hashPassword,
        });

        user
          .save()
          .then((val) => {
            return res.json({ message: "signup successfully" });
          })
          .catch((err) => {
            return res.status(404).json(err);
          });
      });
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please Fill All the Fields !! " });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Incorrect Password or Email!!" });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((ismatch) => {
            if (ismatch) {
              const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
              res.json({
                token: token,
                user: {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                },
              });
              // return res.json({ success: "login successfully" });
            } else
              return res
                .status(422)
                .json({ error: "Incorrect Password or Email!!" });
          })
          .catch((err) => {
            return res.status(422).json(err);
          });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;

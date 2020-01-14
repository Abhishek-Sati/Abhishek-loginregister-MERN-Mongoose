const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
users.use(cors());
process.env.SECRET_KEY = "abhishekuserloginregister";
users.post("/register", (req, res) => {
  const today = new Date();
  const userdata = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phoneNum: req.body.phoneNum,
    password: req.body.password,
    createdOn: today
  };
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 8, (err, hash) => {
          userdata.password = hash;
          User.create(userdata)
            .then(user => {
              res.json({ status: user.email + "registered" });
            })
            .catch(e => {
              res.send("error " + e);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch(e => {
      res.send("error " + e);
    });
});
users.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const olduser = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phoneNum: user.phoneNum
          };
          let token = jwt.sign(olduser, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          res.send(token);
        } else {
          res.json({ error: "User does not exists" });
        }
      } else {
        res.json({ error: "User does not exists" });
      }
    })
    .catch(e => {
      res.send("error " + e);
    });
});
users.get("/profile", (req, res) => {
  const profile = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );
  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch(e => {
      res.send("error" + e);
    });
});
module.exports = users;

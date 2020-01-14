const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express();
app.use(bp.json());
app.use(cors());
app.use(
  bp.urlencoded({
    extended: false
  })
);
const mongoURI = "mongodb://localhost:27017/userloginreg";
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongo server");
  })
  .catch(() => {
    console.log("Cant connect to the mongo server");
  });
const users = require("./routes/users");
app.use("/users", users);
app.listen(port, () => {
  console.log("Connected to port " + port);
});

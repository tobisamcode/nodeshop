const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("62e21486562e6def705f08fd")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const MONGODB_URL = process.env.MONGODB_CONNECTION_URL;

mongoose
  .connect(MONGODB_URL)
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Tobi",
          email: "tobi@test.com",
          cart: {
            items: []
          }
        });
        user.save();
      }
    });

    app.listen(3000, () => {
      console.log("connected!");
    });
  })
  .catch(err => {
    console.log(err);
  });

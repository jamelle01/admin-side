require("dotenv").config();

const express = require("express");
const { router: userRoutes } = require("./routes/users");
const mongoose = require("mongoose");

const cloudinary = require("cloudinary").v2;
var bodyParser = require("body-parser"); 
const cors = require("cors");
const cookieParser = require("cookie-parser");

//express app
const app = express();

cloudinary.config({ // CONNECT TO CLOUD STORAGE
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// IMAGE STORAGE LIMIT
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    limit: "100mb",
    extended: true,
  })
);

app.use(cookieParser());
app.use(cors());
//routes
app.use("/api/users", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port 4000!!!");
    });
  })
  .catch((error) => {
    console.log("sheessh" + error);
  });

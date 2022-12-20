//  load environment variables from a .env file 
require("dotenv").config();
const express = require("express");
const  {router: userRoutes}  = require("./routes/users");
const  {router: adminRoutes} = require("./routes/admin");

//library is used to connect to a MongoDB database
const mongoose = require("mongoose");

//used to interact with the Cloudinary API
const cloudinary = require("cloudinary").v2;

//used to parse the body of HTTP requests
var bodyParser = require("body-parser");
// enable Cross-Origin Resource Sharing (CORS)
const cors = require("cors");
//  used to parse HTTP cookies
const cookieParser = require("cookie-parser");

// used to configure the server and define routes and middleware.
const app = express();

cloudinary.config({
  // CONNECT TO CLOUD STORAGE
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//middleware print purpose
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// IMAGE STORAGE LIMIT photo
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
app.use("/api/users", userRoutes); //for users
app.use("/api/admin", adminRoutes); //for system admin

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

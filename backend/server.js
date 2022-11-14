require('dotenv').config()

const express = require ('express');
const {router:userRoutes} = require('./routes/users');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//express app
const app = express();

//middlewar
app.use(express.json());

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next();
})

//routes
app.use('/api/users', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () =>{
            console.log("connected to db and listening on port 4000!!!");
        })
    })
    .catch((error) => {
        console.log("sheessh"+ error);
    })




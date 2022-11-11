require('dotenv').config()

const express = require ('express');
const userRoutes = require('./routes/users');
const mongoose = require('mongoose');

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




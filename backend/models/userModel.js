const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        data: Buffer, // image will presented as binary
        contentType: String
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);

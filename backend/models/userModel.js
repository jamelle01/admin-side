const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    username: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    img: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);

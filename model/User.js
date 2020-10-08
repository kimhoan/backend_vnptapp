const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 6,
        max: 25
    },
    email: {
        type: String,
        require: true,
        min: 6,
        max: 25
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 25
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("User", userSchema);
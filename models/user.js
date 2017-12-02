const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    login: [{
        type: Schema.Types.ObjectId,
        ref: "Login"
    }],
    balance: {
        type: Number
    }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
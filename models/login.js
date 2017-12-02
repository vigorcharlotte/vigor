const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    login_name: {
        type: String,
        required: true,
    },
    login_pass: {
        type: String,
        required: true
    },
    salt: {
        type: String,
    },
    session: {
        type: String
    }
});
const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
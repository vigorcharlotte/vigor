const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactRequestSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
    }
});
const ContactRequest = mongoose.model("ContactRequest", contactRequestSchema);

module.exports = ContactRequest;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
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
        required: true
    },
    date: {
        type: String,
        required: true
    },
    slot: {
        type: String,
    },
    pfdTherapist: {
        type: String
    },
    apptType: {
        type: String
    }
});
const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
const mongoose = require('mongoose');

const AppointmentFormSchema = new mongoose.Schema({
    name: String,
    surname: String,
    phone: String,
    imageId: mongoose.Schema.Types.ObjectId 
});

const formModel = mongoose.model("AppointmentForm", AppointmentFormSchema);

module.exports = formModel

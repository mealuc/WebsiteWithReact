const mongoose = require("mongoose")

const citySchema = new mongoose.Schema({
    key: Number,
    value: String
})

const cityModel = mongoose.model("City", citySchema);

module.exports = cityModel
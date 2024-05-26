const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    houseType: String,
    location: String,
    bedroomsNumber: Number,
    bathroomsNumber: Number,
    squareFootage: Number,
    cost: Number,
    parkingAre: String,
    nearHospital: String,
    nearSchool: String,
    sellerMail: String
});

module.exports = mongoose.model('item', itemSchema);
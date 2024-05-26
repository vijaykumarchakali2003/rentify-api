const mongoose = require('mongoose');

const intrestedSchema = mongoose.Schema({
    productId: String,
    userMail: String,
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

module.exports = mongoose.model('intrested', intrestedSchema);
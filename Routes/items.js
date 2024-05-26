const express = require('express');
const item = require('../Models/item');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const querystring = require('querystring');
const url = require('url');

const app = express();

app.use(bodyParser.raw());

exports.addItem = async ( req,res) => {
    const houseType = req.body.houseType;
    const location = req.body.location;
    const bedroomsNumber= req.body.bedroomsNumber;
    const bathroomsNumber= req.body.bathroomsNumber;
    const squareFootage= req.body.squareFootage;
    const cost= req.body.cost;
    const parkingAre= req.body.parkingAre;
    const nearHospital= req.body.nearHospital;
    const nearSchool= req.body.nearSchool;
    const sellerMail = req.body.sellerMail;

    const newItem = new item({
        houseType ,
        location,
        bedroomsNumber,
        bathroomsNumber,
        squareFootage,
        cost,
        parkingAre,
        nearHospital,
        nearSchool,
        sellerMail
    });

    const savedItem = await newItem.save();
    res.json({ message: 'Successfully Inserted the Item'});
    console.log(req.body);
}

exports.getUserItems = async (req, res) => {
    const emailId = req.body.emailId;
    let userData;
    try { 
        userData = await item.find({ sellerMail: emailId});
    } catch (err) {
        console.log(err);
        return res.json({'error':err})
    }
    if (!userData) {
        return res.json({'message':'No Data Available'});
    } else {
        return res.json({'userItems': userData});
    }
}

exports.updateItem = async (req,res) => {
    const _id = req.body.id;
    let itemData = {};
    try {
        itemData = await item.find({ _id : _id});
        console.log(itemData);
    } catch (err) {
        console.log(err);
    }
    if ( req.body.houseType) {
        itemData.houseType = req.body.houseType;
    } 
    if ( req.body.location) {
        itemData.location = req.body.location;
    } 
    if ( req.body.bedroomsNumber) {
        itemData.bedroomsNumber = req.body.bedroomsNumber;
    } 
    if ( req.body.bathroomsNumber) {
        itemData.bathroomsNumber = req.body.bathroomsNumber;
    } 
    if ( req.body.cost) {
        itemData.cost = req.body.cost;
    } 
    if ( req.body.nearHospital) {
        itemData.nearHospital = req.body.nearHospital;
    } 
    if ( req.body.nearSchool) {
        itemData.nearSchool = req.body.nearSchool;
    } 
    if ( req.body.parkingAre) {
        itemData.parkingAre = req.body.parkingAre;
    } 
    if ( req.body.squareFootage) {
        itemData.squareFootage = req.body.squareFootage;
    } 

    const filter = { _id: ObjectId(_id) }; 

    const updateDocument = {
        $set: {
            houseType: itemData.houseType,
            location: itemData.location,
            bedroomsNumber: itemData.bedroomsNumber,
            bathroomsNumber: itemData.bathroomsNumber,
            cost: itemData.cost,
            nearHospital: itemData.nearHospital,
            nearSchool: itemData.nearSchool,
            parkingAre: itemData.parkingAre,
            squareFootage: itemData.squareFootage
        }
    };
    try {
        const result = await item.updateOne(filter, updateDocument);
        return res.json({'message': result.acknowledged});
    } catch(err) {
        console.log(err);
        return res.json({'error': err}); 
    }
}

exports.getAllItems = async (req,res) => {
    console.log(req.query.emailId);
    console.log("HOOOOOOOOOOOO");
    let allItems;
    try {
        allItems = await item.find();
        return res.json({'allItems': allItems});
    } catch (err) {
        return res.json({'error':err});
    }
}
function getValidObjectId(id) {
    if (ObjectId.isValid(id)) {
      return new ObjectId(id);
    } else {
      throw new Error('Invalid ID format');
    }
  }

exports.deleteItems = async (req,res) => {
    const filter = new ObjectId(req.body.id);
    try {
        const data = await item.deleteOne({ _id: filter});
        console.log(data);
        return res.json({'message': data});
    } catch (err) {
        console.log(err);
        return res.json({'error': err});
    }
}

exports.getFilteredData = async (req,res) => {
    const query = {};
    if ( req.query.byPrice) {
        const x = Number(req.query.byPrice);
        query.cost = { $gte: x };
    }
    if ( req.query.byLocation ) {
        query.location = req.query.byLocation;
    }
    if ( req.query.byRoom) {
        query.bedroomsNumber = req.query.byRoom;
    }

    console.log(query);
    let data;
    try {
        data = await item.find(query);
        console.log(data);
        return res.json({'data': data});
    } catch (err) {
        console.log(err);
        return res.json({'error': err});
    }
}


const express = require('express');
const intrested = require('../Models/intrested');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const querystring = require('querystring');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.raw());

exports.putIntrested = async (req, res) => {
    const productId = req.body.productId;
    const userMail = req.body.userMail;
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

    const newIntrestedItem = new intrested({
        productId,
        userMail,
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

    const savedItem = await newIntrestedItem.save();
    res.json({ message: 'Successfully Inserted the Intrested_Item'});
    console.log(req.body);
}

exports.getUserIntrestedItems = async ( req,res) => {
    const emailId = req.query.emailId;
    console.log(emailId);
    try {
        const data = await intrested.find({ userMail: emailId});
        return res.json({data: data});
    } catch (err) {
        return res.json({'error': err});
    }
}

exports.getSellerOrders = async (req,res) => {
    const emailId = req.query.emailId;
    console.log(emailId);
    try {
        const data = await intrested.find({ sellerMail: emailId});
        return res.json({data: data});
    } catch (err) {
        return res.json({'error': err});
    }
}

exports.sendMail = async (req,res) => {
    const productId = req.body.productId;
    const userMail = req.body.userMail;
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

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vijaykumarchakali2024@gmail.com',
          pass: 'aree cxey fqtr iasm'
        }
      });
      
      var mailOptions = {
        from: 'vijaykumarchakali2024@gmail.com',
        to: sellerMail,
        subject: 'Users Intrested in your Product',
        text: `From Rentify App:\nDetails below: \n 
        Product Id:${productId}\n 
        UserMail${userMail} \n 
        HouseType: ${houseType}\n
        Location: ${location}\n
        Bathrooms: ${bedroomsNumber}\n 
        BathRooms: ${bathroomsNumber}\n
        SquareFeet: ${squareFootage}\n
        Cost: ${cost}\n
        Parking Area${parkingAre}\n
        Hospital ${nearHospital}\n
        School ${nearSchool}`
      };
      
      var mailOptions2 = {
        from: 'vijaykumarchakali2024@gmail.com',
        to: userMail,
        subject: 'Users Intrested in your Product',
        text: `From Rentify App:\nDetails below: \n 
        Product Id:${productId}\n 
        UserMail${userMail} \n 
        HouseType: ${houseType}\n
        Location: ${location}\n
        Bathrooms: ${bedroomsNumber}\n 
        BathRooms: ${bathroomsNumber}\n
        SquareFeet: ${squareFootage}\n
        Cost: ${cost}\n
        Parking Area${parkingAre}\n
        Hospital ${nearHospital}\n
        School ${nearSchool}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      transporter.sendMail(mailOptions2, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
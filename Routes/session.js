const express = require('express');
const user = require('../Models/user');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();

app.use(bodyParser.raw());

exports.createNewUser = async (req,res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailId = req.body.emailId;
    const mobileNumber = req.body.mobileNumber;
    const password = req.body.password;
    const role = req.body.role;

    let data;
    try {
        data = await user.find({ emailId});
    } catch (err) {
        return res.json({ 'error': err})
    }
    console.log(data);

    if ( (data.mobileNumber === mobileNumber) || (data.length)) {
        console.log("User Already Exist !");
        res.status(403);
        return res.json({ 'message': 'User Already Exist with Mobile Number or Mail'});
    }

    const newUser = new user({
        firstName,
        lastName,
        emailId,
        mobileNumber,
        password,
        role
    });

    const savedUser = await newUser.save();
    res.json({ message: 'Successfully Inserted the user'});
    console.log(req.body);
};

exports.loginUser = async ( req,res) => {
    console.log(req.body);
    const emailId = req.body[0].emailId;
    const password = req.body[0].password;
    let data;
    console.log(emailId)
    try {
        data = await user.find({emailId: emailId});
    } catch (err) {
        console.log('Error while loging ==> ',err);
        return res.json({'error':err});
    }
    console.error(data)

    if (!data.length) {
        return res.json({'message':'User Not Exist'});
    } else {
        if (password === data[0].password) {
            console.log("Successfully Logges the user  ==> ", emailId);
            const obj = {
                firstName: data[0].firstName,
                lastName: data[0].lastName,
                emailId: data[0].emailId,
                mobileNumber: data[0].mobileNumber,
                role: data[0].role
            }
            return res.json({'userInfo': obj});
        }
        return res.json({'message':'Wrong Password'});
    }
}


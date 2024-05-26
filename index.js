const express = require('express');
const bodyParser = require('body-parser');
const session = require('./Routes/session');
const items = require('./Routes/items')
const intrested = require('./Routes/intrested')
const mongo = require('./Utils/mongo')
const cors = require('cors')
const app = express();
const port = process.env.port;

app.use(cors('*'));
app.use(express.json())
app.post('/createUser', session.createNewUser);
app.post('/loginUser', session.loginUser);
app.post('/addNewItem', items.addItem);
app.post('/getUserItems', items.getUserItems);
app.get('/getAllItems', items.getAllItems);
app.post('/putIntrestedItems', intrested.putIntrested);
app.get('/getUserIntrestedItems', intrested.getUserIntrestedItems);
app.get('/getSellerOrders', intrested.getSellerOrders);
app.delete('/deleteItems', items.deleteItems);
app.patch('/updateItems', items.updateItem);
app.get('/getFilteredData', items.getFilteredData);
app.post('/sendMail', intrested.sendMail);

const PORT = port;
app.listen( PORT, () => {
    console.log('Server Started !');
})
console.log("HI")
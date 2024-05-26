const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      const conn = await mongoose.connect("mongodb+srv://vijaykumarchakali2024:I84YYLZ7SCMI5ZyC@rentify.bzvo6hu.mongodb.net/?retryWrites=true&w=majority&appName=Rentify");
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };


  
  connectDB();
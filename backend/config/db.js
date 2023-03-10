const mongoose = require('mongoose');
const url = 'mongodb://localhost/jwtDB'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url, {useNewUrlParser:true});

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;

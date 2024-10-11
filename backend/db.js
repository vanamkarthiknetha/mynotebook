const mongoose = require("mongoose");
// require('dotenv').config()                           //use while running only backend folder
require('dotenv').config({ path: './backend/.env' });  // use while running concurrenly
const mongoUri = process.env.DB_URI;
// console.log(process.env)

const connectToMongo = () => {
  mongoose.connect(
    mongoUri,
    new Promise((resolve, reject) => {
      console.log("Connected to mongodb");
    })
  );
};

module.exports = connectToMongo;

const mongoose = require("mongoose");
const mongoUri = "mongodb://localhost:27017/mynotebook";

const connectToMongo = () => {
  mongoose.connect(
    mongoUri,
    new Promise((resolve, reject) => {
      console.log("Connected to mongodb");
    })
  );
};

module.exports = connectToMongo;

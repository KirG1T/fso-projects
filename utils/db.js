const mongoose = require('mongoose');
const config = require('./config');

const connectDB = () => {
  mongoose.set('strictQuery', false);

  mongoose
    .connect(config.MONGODB_URI)
    .then((result) => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });
};

module.exports = connectDB;

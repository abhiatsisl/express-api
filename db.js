const mongoose = require('mongoose');

const connectToMongo = () => {
     mongoose.connect('mongodb://localhost:27017/test', () => {
      console.log('Connected successfully');
  });
}
module.exports = connectToMongo;
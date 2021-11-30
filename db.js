const mongoose = require('mongoose');

const connectToMongo = () => {
  //    mongoose.connect('mongodb://localhost:27017/test', () => {
  //     console.log('Connected successfully');
  // });

  mongoose.connect('mongodb+srv://abhishek_jaiswal:abhishek@cluster0.0ew82.mongodb.net/test?retryWrites=true&w=majority', () => {
    console.log('Connected successfully');
  });
}
module.exports = connectToMongo;
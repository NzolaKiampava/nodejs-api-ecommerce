const mongoose = require('mongoose');

const uri = 'mongodb+srv://kiampava:kiampava@cluster0.sjdxwzs.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'ecommerce';

const dbConnect = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: dbName });
    console.log('Connected successfully to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
    throw err;
  }
};

module.exports = dbConnect;
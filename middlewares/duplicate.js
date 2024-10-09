const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;


const usernameEmail = async (req, res, next) => {
  const { 
    firstName, 
    lastName, 
    middleName, 
    email, 
    phone, 
    username,
    password 
  } = req.body;
  const existingEmail = await mongodb.getDb().db().collection('user').findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: 'email is found with another user.'});
    }
    const existingUser = await mongodb.getDb().db().collection('user').findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
  }
  next();
  };

  const updateUserEmail = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const { 
      firstName, 
      lastName, 
      middleName, 
      email, 
      phone, 
      username,
      password 
    } = req.body;
  
    const existingEmail = await mongodb.getDb().db().collection('user').findOne({ email });
    if (existingEmail && existingEmail._id.toString() !== userId.toString()) {
      return res.status(409).json({ message: 'Email is found with another user.' });
    }
  
    const existingUser = await mongodb.getDb().db().collection('user').findOne({ username });
    if (existingUser && existingUser._id.toString() !== userId.toString()) {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    next();
  };
  


  

  module.exports = {
    usernameEmail, updateUserEmail
  }
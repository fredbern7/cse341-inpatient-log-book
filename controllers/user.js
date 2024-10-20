const mongodb = require('../db/connection');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const result = await mongodb.getDb().db().collection('user').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getOne = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('user').find({ _id: userId });
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleName: req.body.middleName,
      email: req.body.email,
      phone: req.body.phone,
      username: req.body.username,
      password: hashedPassword
    };

    const response = await mongodb.getDb().db().collection('user').insertOne(user);
    if (response.acknowledged) {
      return res.status(201).json(response);
    } else {
      throw new Error('Failed to create user');
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleName: req.body.middleName,
      email: req.body.email,
      phone: req.body.phone,
      username: req.body.username,
      password: hashedPassword
    };

    const response = await mongodb.getDb().db().collection('user').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      return res.status(204).send();
    } else {
      throw new Error('Failed to update user');
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('user').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
      return res.status(204).send();
    } else {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAll,
  getOne,
  createUser,
  updateUser,
  deleteUser
};

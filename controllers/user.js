const mongodb = require('../db/connection');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('user').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getOne = async (req, res) => {
  const userId = new ObjectId(req.params.id)
  const result = await mongodb.getDb().db().collection('user').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createUser = async (req, res) => {
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
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating a user.');
  }
};

const updateUser = async (req, res) => {
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

  const response = await mongodb
    .getDb()
    .db()
    .collection('user')
    .replaceOne({ _id: userId }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Errors while updating the user.');
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('user').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Errors wheh deleting user.');
  }
};

module.exports = {
  getAll, getOne, createUser, updateUser, deleteUser
}
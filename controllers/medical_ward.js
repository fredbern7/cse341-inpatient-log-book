const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Medical Ward']
  try {
    const result = await mongodb.getDb().db().collection('medical-ward').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while fetching data', error: err });
  }
};

const getOne = async (req, res) => {
  //#swagger.tags=['Medical Ward']
  try {
    const logId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('medical-ward').find({ _id: logId });
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    if (lists.length > 0) {
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ message: 'Log not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while fetching the log', error: err });
  }
};

const createLog = async (req, res) => {
  //#swagger.tags=['Medical Ward']
  try {
    const log = {
      hospitalNumber: req.body.hospitalNumber,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      admissionDate: req.body.admissionDate,
      chiefComplaint: req.body.chiefComplaint,
      dischargeDate: req.body.dischargeDate,
      dischargeDiagnose: req.body.dischargeDiagnose,
      dateAppointment: req.body.dateAppointment,
    };
    const response = await mongodb.getDb().db().collection('medical-ward').insertOne(log);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'An error occurred while creating the log' });
    }
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while creating the log', error: err });
  }
};

const updateLog = async (req, res) => {
  //#swagger.tags=['Medical Ward']
  try {
    const userId = new ObjectId(req.params.id);
    const log = {
      hospitalNumber: req.body.hospitalNumber,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      admissionDate: req.body.admissionDate,
      chiefComplaint: req.body.chiefComplaint,
      dischargeDate: req.body.dischargeDate,
      dischargeDiagnose: req.body.dischargeDiagnose,
      dateAppointment: req.body.dateAppointment,
    };
    const response = await mongodb.getDb().db().collection('medical-ward').replaceOne({ _id: userId }, log);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'An error occurred while updating the log' });
    }
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while updating the log', error: err });
  }
};

const deleteLog = async (req, res) => {
  //#swagger.tags=['Medical Ward']
  try {
    const logId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('medical-ward').deleteOne({ _id: logId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'An error occurred while deleting the log' });
    }
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while deleting the log', error: err });
  }
};

module.exports = {
  getAll, getOne, createLog, updateLog, deleteLog
};

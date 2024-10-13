const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('medical-ward').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getOne = async (req, res) => {
  const logId = new ObjectId(req.params.id)
  const result = await mongodb.getDb().db().collection('medical-ward').find({ _id: logId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createLog = async (req, res) => {
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
    dateAppointment: req.body.dateAppointment,
  };
  const response = await mongodb.getDb().db().collection('medical-ward').insertOne(log);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating a log.');
  }
};

const updateLog = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
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

  const response = await mongodb
    .getDb()
    .db()
    .collection('medical-ward')
    .replaceOne({ _id: userId }, log);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Errors while updating the log.');
  }
};

const deleteLog = async (req, res) => {
  const logId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('medical-ward').deleteOne({ _id: logId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Errors wheh deleting log.');
  }
};

module.exports = {
  getAll, getOne, createLog, updateLog, deleteLog
}
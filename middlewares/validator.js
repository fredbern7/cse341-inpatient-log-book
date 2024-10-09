const validator = require('../helpers/validate');

const validateUser = (req, res, next) => {
  const userRules = {
    firstName: 'required|string',
    lastName: 'required|string',
    middleName: 'string',
    email: 'required|email',
    phone: 'required|string|min:7|max:8',
    username: 'required|string',
    password: ['required', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/'] 
  };

validator(req.body, userRules, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const validateLog = (req, res, next) => {
  const logRules = {
    hospitalNumber: 'required|string',
    lastName: 'required|string',
    firstName: 'required|string',
    middleName: 'string',
    admissionDate: 'required|date',
    chiefComplaint: 'required|string',
    dischargeDate: 'date',
    dischargeDiagnose: 'string',
    dateAppointment: 'date'
  };
  
  validator(req.body, logRules, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  validateLog, validateUser
};
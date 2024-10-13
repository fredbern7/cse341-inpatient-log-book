const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'Log Book Api',
        desciption: 'Log Book Api'
    },
    host: 'cse341-inpatient-log-book.onrender.com',
    schemes: ['https', 'http']
};

const outputFile = 'swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
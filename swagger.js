const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'Contacts Api',
        desciption: 'Contacts Api'
    },
    host: 'project-1-t0mj.onrender.com',
    schemes: ['https', 'http']
};

const outputFile = 'swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
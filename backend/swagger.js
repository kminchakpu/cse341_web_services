const swaggerAutogen = require('swagger-autogen')({
  openapi: '3.0.0',
});
const doc = {
  info: {
    title: 'Contacts API',
    version: '1.0.0',
    description: 'A REST API for managing contacts stored in MongoDB.',
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Local server',
    },
    {
      url: 'https://cse341-web-services-1.onrender.com',
      description: 'Production server',
    },
  ],
};
const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/contactsRoutes.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);
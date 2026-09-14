const fs = require("fs");
const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
      description: "A REST API for managing contacts stored in MongoDB.",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local server",
      },
      {
        url: "https://cse341-web-services-1.onrender.com",
        description: "Production server",
      },
    ],
  },
  apis: ["./routes/contactsRoutes.js"],
};
const swaggerSpec = swaggerJsdoc(options);
fs.writeFileSync(
  "./swagger-output.json",
  JSON.stringify(swaggerSpec, null, 2)
);
console.log("swagger-output.json generated successfully.");
module.exports = swaggerSpec;
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");


const { connectDatabase } = require("./db/connect");
const swaggerSpec = require("./swagger");
const professionalRoutes = require("./routes/professionalRoutes");
const contactsRoutes = require("./routes/contactsRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", professionalRoutes);
app.use("/contacts", contactsRoutes);

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });
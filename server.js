const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const homeRoutes = require("./routes/homeRoutes");

app.use("/", homeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
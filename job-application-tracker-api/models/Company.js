const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
  industry: {
    type: String,
    required: [true, "Industry is required"],
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  contactEmail: {
    type: String,
    trim: true,
    lowercase: true,
  },
});
module.exports = mongoose.model("Company", companySchema);
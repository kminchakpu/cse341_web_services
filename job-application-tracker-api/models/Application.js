const mongoose = require("mongoose");
const applicationSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, "Job title is required"],
    trim: true,
  },
  companyName: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
  },
  applicationDate: {
    type: Date,
    required: [true, "Application date is required"],
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: [
      "Applied",
      "Interview",
      "Offer",
      "Rejected",
      "Withdrawn",
    ],
  },
  jobType: {
    type: String,
    required: [true, "Job type is required"],
    enum: [
      "Full-time",
      "Part-time",
      "Contract",
      "Internship",
      "Remote",
    ],
  },
  salaryRange: {
    type: String,
    trim: true,
  },
  jobUrl: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
});
module.exports = mongoose.model("Application", applicationSchema);
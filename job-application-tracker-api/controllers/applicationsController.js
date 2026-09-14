const mongoose = require("mongoose");
const Application = require("../models/Application");

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error retrieving applications:", error);

    res.status(500).json({
      message: "Error retrieving applications",
    });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const applicationId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({
        message: "Invalid application ID",
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error("Error retrieving application:", error);

    res.status(500).json({
      message: "Error retrieving application",
    });
  }
};

const createApplication = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      location,
      applicationDate,
      status,
      jobType,
      salaryRange,
      jobUrl,
      notes,
    } = req.body;

    if (
      !jobTitle ||
      !companyName ||
      !location ||
      !applicationDate ||
      !status ||
      !jobType
    ) {
      return res.status(400).json({
        message:
          "Job title, company name, location, application date, status, and job type are required",
      });
    }

    const application = await Application.create({
      jobTitle,
      companyName,
      location,
      applicationDate,
      status,
      jobType,
      salaryRange,
      jobUrl,
      notes,
    });

    res.status(201).json({
      message: "Application created successfully",
      application,
    });
  } catch (error) {
    console.error("Error creating application:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(error.errors).map(
          (item) => item.message
        ),
      });
    }

    res.status(500).json({
      message: "Error creating application",
    });
  }
};

const updateApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({
        message: "Invalid application ID",
      });
    }

    const {
      jobTitle,
      companyName,
      location,
      applicationDate,
      status,
      jobType,
      salaryRange,
      jobUrl,
      notes,
    } = req.body;

    if (
      !jobTitle ||
      !companyName ||
      !location ||
      !applicationDate ||
      !status ||
      !jobType
    ) {
      return res.status(400).json({
        message:
          "Job title, company name, location, application date, status, and job type are required",
      });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      {
        jobTitle,
        companyName,
        location,
        applicationDate,
        status,
        jobType,
        salaryRange,
        jobUrl,
        notes,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedApplication) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      message: "Application updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating application:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(error.errors).map(
          (item) => item.message
        ),
      });
    }

    res.status(500).json({
      message: "Error updating application",
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({
        message: "Invalid application ID",
      });
    }

    const deletedApplication =
      await Application.findByIdAndDelete(applicationId);

    if (!deletedApplication) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting application:", error);

    res.status(500).json({
      message: "Error deleting application",
    });
  }
};

module.exports = {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
};
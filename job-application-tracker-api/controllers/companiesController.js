const mongoose = require("mongoose");
const Company = require("../models/Company");

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error retrieving companies:", error);
    res.status(500).json({
      message: "Error retrieving companies",
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        message: "Invalid company ID",
      });
    }
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error("Error retrieving company:", error);
    res.status(500).json({
      message: "Error retrieving company",
    });
  }
};

const createCompany = async (req, res) => {
  try {
    const {
      name,
      industry,
      website,
      location,
      contactEmail,
    } = req.body;
    if (!name || !industry) {
      return res.status(400).json({
        message: "Company name and industry are required",
      });
    }
    const company = await Company.create({
      name,
      industry,
      website,
      location,
      contactEmail,
    });
    res.status(201).json({
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(error.errors).map(
          (item) => item.message
        ),
      });
    }
    res.status(500).json({
      message: "Error creating company",
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        message: "Invalid company ID",
      });
    }
    const {
      name,
      industry,
      website,
      location,
      contactEmail,
    } = req.body;
    if (!name || !industry) {
      return res.status(400).json({
        message: "Company name and industry are required",
      });
    }
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      {
        name,
        industry,
        website,
        location,
        contactEmail,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedCompany) {
      return res.status(404).json({
        message: "Company not found",
      });
    }
    res.status(200).json({
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(error.errors).map(
          (item) => item.message
        ),
      });
    }
    res.status(500).json({
      message: "Error updating company",
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        message: "Invalid company ID",
      });
    }
    const deletedCompany = await Company.findByIdAndDelete(companyId);
    if (!deletedCompany) {
      return res.status(404).json({
        message: "Company not found",
      });
    }
    res.status(200).json({
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({
      message: "Error deleting company",
    });
  }
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};
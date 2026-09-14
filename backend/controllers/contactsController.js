const mongoose = require("mongoose");
const Contact = require("../models/Contact");
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting contacts:", error);
    res.status(500).json({
      message: "Error retrieving contacts",
    });
  }
};
const getSingleContact = async (req, res) => {
  try {
    const contactId = req.query.id;
    if (!contactId) {
      return res.status(400).json({
        message: "Contact ID is required",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: "Invalid contact ID",
      });
    }
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error getting contact:", error);
    res.status(500).json({
      message: "Error retrieving contact",
    });
  }
};
const createContact = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    } = req.body;
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    });
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(error.errors).map(
          (item) => item.message
        ),
      });
    }
    res.status(500).json({
      message: "Error creating contact",
    });
  }
};
const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: "Invalid contact ID",
      });
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedContact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(error.errors).map(
          (item) => item.message
        ),
      });
    }
    res.status(500).json({
      message: "Error updating contact",
    });
  }
};
const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: "Invalid contact ID",
      });
    }
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }
    res.status(200).json({
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({
      message: "Error deleting contact",
    });
  }
};
module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
};
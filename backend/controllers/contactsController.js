const { getDatabase } = require("../db/connect");
const { ObjectId } = require("mongodb");

const getAllContacts = async (req, res) => {
  try {
    const database = getDatabase();

    const contacts = await database
      .collection("contacts")
      .find()
      .toArray();

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
    const database = getDatabase();

    const contactId = req.query.id;

    const contact = await database
      .collection("contacts")
      .findOne({
        _id: new ObjectId(contactId),
      });

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
    const database = getDatabase();

    const {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !favoriteColor ||
      !birthday
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const result = await database
      .collection("contacts")
      .insertOne(newContact);

    res.status(201).json({
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating contact:", error);

    res.status(500).json({
      message: "Error creating contact",
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const database = getDatabase();

    const contactId = req.params.id;

    const {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !favoriteColor ||
      !birthday
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const updatedContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const result = await database
      .collection("contacts")
      .replaceOne(
        { _id: new ObjectId(contactId) },
        updatedContact
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error updating contact:", error);

    res.status(500).json({
      message: "Error updating contact",
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const database = getDatabase();

    const contactId = req.params.id;

    const result = await database
      .collection("contacts")
      .deleteOne({
        _id: new ObjectId(contactId),
      });

    if (result.deletedCount === 0) {
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
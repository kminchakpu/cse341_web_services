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

module.exports = {
  getAllContacts,
  getSingleContact,
};
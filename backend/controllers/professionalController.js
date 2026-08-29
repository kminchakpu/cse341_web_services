const { getDatabase } = require("../db/connect");

const getProfessional = async (req, res) => {
  try {
    const database = getDatabase();

    const professional = await database
      .collection("professionals")
      .findOne({});

    if (!professional) {
      return res.status(404).json({
        message: "Professional information not found",
      });
    }

    res.json(professional);
  } catch (error) {
    console.error("Error retrieving professional:", error);

    res.status(500).json({
      message: "Error retrieving professional information",
    });
  }
};

module.exports = {
  getProfessional,
};
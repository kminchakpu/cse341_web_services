const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contactsController");


/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Returns all contacts stored in the database.
 *     tags:
 *       - Contacts
 *     responses:
 *       200:
 *         description: A list of contacts.
 *       500:
 *         description: Server error.
 */
router.get("/", contactsController.getAllContacts);

/**
 * @swagger
 * /contacts/single:
 *   get:
 *     summary: Get a single contact
 *     description: Returns a contact using its MongoDB ID.
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: MongoDB ID of the contact.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact found.
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Server error.
 */
router.get("/single", contactsController.getSingleContact);


/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Creates a new contact in the MongoDB contacts collection.
 *     tags:
 *       - Contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - favoriteColor
 *               - birthday
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Kevin
 *               lastName:
 *                 type: string
 *                 example: Minchakpu
 *               email:
 *                 type: string
 *                 example: kevin@example.com
 *               favoriteColor:
 *                 type: string
 *                 example: Blue
 *               birthday:
 *                 type: string
 *                 example: 1999-01-15
 *     responses:
 *       201:
 *         description: Contact created successfully.
 *       400:
 *         description: All fields are required.
 *       500:
 *         description: Server error.
 */
router.post("/", contactsController.createContact);



/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     description: Updates an existing contact using its MongoDB ID.
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the contact to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - favoriteColor
 *               - birthday
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Kevin
 *               lastName:
 *                 type: string
 *                 example: Minchakpu
 *               email:
 *                 type: string
 *                 example: updated@example.com
 *               favoriteColor:
 *                 type: string
 *                 example: Green
 *               birthday:
 *                 type: string
 *                 example: 1999-01-15
 *     responses:
 *       204:
 *         description: Contact updated successfully.
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Server error.
 */
router.put("/:id", contactsController.updateContact);


/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     description: Deletes a contact using its MongoDB ID.
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the contact to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully.
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Server error.
 */
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
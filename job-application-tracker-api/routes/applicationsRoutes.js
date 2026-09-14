const express = require("express");
const router = express.Router();
const applicationsController = require("../controllers/applicationsController");

router.get("/", (req, res, next) => {
  /*
    #swagger.tags = ['Applications']
    #swagger.summary = 'Get all job applications'
    #swagger.description = 'Returns all job applications stored in the database.'
    #swagger.responses[200] = {
      description: 'Applications retrieved successfully'
    }
    #swagger.responses[500] = {
      description: 'Error retrieving applications'
    }
  */
  return applicationsController.getAllApplications(req, res, next);
});

router.get("/:id", (req, res, next) => {
  /*
    #swagger.tags = ['Applications']
    #swagger.summary = 'Get a job application by ID'
    #swagger.description = 'Returns one job application using its MongoDB ObjectId.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Application ID',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Application retrieved successfully'
    }
    #swagger.responses[400] = {
      description: 'Invalid application ID'
    }
    #swagger.responses[404] = {
      description: 'Application not found'
    }
    #swagger.responses[500] = {
      description: 'Error retrieving application'
    }
  */
  return applicationsController.getApplicationById(req, res, next);
});

router.post("/", (req, res, next) => {
  /*
    #swagger.tags = ['Applications']
    #swagger.summary = 'Create a new job application'
    #swagger.description = 'Creates a new job application in MongoDB.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Application"
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Application created successfully'
    }
    #swagger.responses[400] = {
      description: 'Validation failed or required fields are missing'
    }
    #swagger.responses[500] = {
      description: 'Error creating application'
    }
  */
  return applicationsController.createApplication(req, res, next);
});

router.put("/:id", (req, res, next) => {
  /*
    #swagger.tags = ['Applications']
    #swagger.summary = 'Update a job application'
    #swagger.description = 'Updates an existing job application using its MongoDB ObjectId.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Application ID',
      required: true,
      type: 'string'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Application"
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Application updated successfully'
    }
    #swagger.responses[400] = {
      description: 'Invalid ID or validation failed'
    }
    #swagger.responses[404] = {
      description: 'Application not found'
    }
    #swagger.responses[500] = {
      description: 'Error updating application'
    }
  */
  return applicationsController.updateApplication(req, res, next);
});

router.delete("/:id", (req, res, next) => {
  /*
    #swagger.tags = ['Applications']
    #swagger.summary = 'Delete a job application'
    #swagger.description = 'Deletes a job application using its MongoDB ObjectId.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Application ID',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Application deleted successfully'
    }
    #swagger.responses[400] = {
      description: 'Invalid application ID'
    }
    #swagger.responses[404] = {
      description: 'Application not found'
    }
    #swagger.responses[500] = {
      description: 'Error deleting application'
    }
  */
  return applicationsController.deleteApplication(req, res, next);
});

module.exports = router;
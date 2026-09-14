const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const doc = {
  info: {
    title: "Job Application Tracker API",
    version: "1.0.0",
    description: "REST API for managing job applications and companies.",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Local development server",
    },
  ],
  tags: [
    {
      name: "Applications",
      description: "Job application management endpoints",
    },
    {
      name: "Companies",
      description: "Company management endpoints",
    },
  ],
  components: {
    schemas: {
      Application: {
        jobTitle: "Backend Developer",
        companyName: "Tech Solutions Ltd",
        location: "Lagos, Nigeria",
        applicationDate: "2026-09-14",
        status: "Applied",
        jobType: "Full-time",
        salaryRange: "₦900,000 - ₦1,300,000 monthly",
        jobUrl: "https://example.com/jobs/backend-developer",
        notes: "Application submitted successfully.",
      },
      Company: {
        name: "Tech Solutions Ltd",
        industry: "Information Technology",
        website: "https://example.com",
        location: "Lagos, Nigeria",
        contactEmail: "careers@example.com",
      },
    },
  },
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);
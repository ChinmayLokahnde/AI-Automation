const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { createWorkflow, getWorkflows, runWorkflow, getWorkflow, getExecution } = require("../controllers/workflowController");

router.post("/", createWorkflow);
router.post("/run/:id", runWorkflow);
router.get("/", getWorkflows);
router.get("/:id", getWorkflow);
router.get("/exeution/:id", getExecution);

module.exports = router;



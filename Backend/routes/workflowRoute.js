const express = require("express");
const router = express.Router();
const { createWorkflow, getWorkflows, runWorkflow, getWorkflow, getExecution,getExecutions } = require("../controllers/workflowController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/",authMiddleware, createWorkflow);
router.post("/run/:id", authMiddleware, runWorkflow);
router.get("/",authMiddleware, getWorkflows);
router.get("/executions",authMiddleware, getExecutions);
router.get("/execution/:id",authMiddleware, getExecution);
router.get("/:id",authMiddleware, getWorkflow);

module.exports = router;



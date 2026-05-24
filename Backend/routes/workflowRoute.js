const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { createWorkflow, getWorkflows, runWorkflow, getWorkflow, getExecution } = require("../controllers/workflowController");

router.post("/", auth, createWorkflow);
router.post("/run/:id", auth, runWorkflow);
router.get("/", auth, getWorkflows);
router.get("/:id", auth, getWorkflow);
router.get("/exeution/:id", auth, getExecution);

module.exports = router;



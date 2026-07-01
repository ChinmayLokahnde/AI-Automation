const express = require("express");
const router = express.Router();

const {
    triggerWebhook,
} = require("../controllers/webhookController");

router.post("/:workflowId",triggerWebhook);

module.exports = router;
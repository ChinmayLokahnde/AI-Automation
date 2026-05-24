const {Queue} = require("bullmq");
const connection = require("../queue/redis");

const workflowQueue = new Queue(
    "workflow-execution",
    {connection}
)

module.exports = workflowQueue;

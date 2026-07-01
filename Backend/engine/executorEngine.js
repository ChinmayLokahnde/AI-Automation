const workflowQueue = require("../queue/workflowQueue");
const { Workflow, Execution } = require("../db/schemas");

const startExecution = async (
    workflowId,
    userId,
    triggerData = {}
) => {

    const workflow = await Workflow.findById(workflowId);

    if (!workflow) {
        throw new Error("workflow not exists");
    }

    const execution = await Execution.create({
        workflowId,
        userId,
        status: "running",

        context: {
            webhook: triggerData
        }
    });

    await workflowQueue.add(
        "workflow-execution",
        {
            executionId: execution._id
        }
    );

    return execution;
};

module.exports = { startExecution };
const { Workflow } = require("../db/schemas");
const { startExecution } = require("../engine/executorEngine");

exports.triggerWebhook = async (req, res) => {
    try {

        const workflow = await Workflow.findById(
            req.params.workflowId
        );

        if (!workflow) {
            return res.status(404).json({
                message: "Workflow not found"
            });
        }

        const execution = await startExecution(
            workflow._id,
            workflow.userId,
            req.body
        );

        res.json({
            success: true,
            executionId: execution._id,
            received: req.body
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }
};
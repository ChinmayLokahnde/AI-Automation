const {Workflow, Execution} = require("../db/schemas");
const {startExecution} = require("../engine/executorEngine");

exports.createWorkflow = async (req, res) =>{
    try{
        const workflow = await Workflow.create({
            ...req.body,
             userId: req.user.id
        })
        res.json(workflow)
    }catch(err){
        console.error(err
        )
        res.status(500).json({message: err.message})
    }
};

exports.runWorkflow = async (req,res)=>{
    try{
        const workflowId = req.params.id

        const workflow = await Workflow.findOne({
                _id: workflowId,
                userId: req.user.id
            });
        if(!workflow){
            return res.status(404).json({Message:"workflow not found"})
        };

        const execution = await startExecution(
            workflowId,
            req.user.id,
            {}
        )
        res.json({
            message:"Execution started ",
            executionId: execution._id
        })
    }catch(err){
        console.error(err)
        res.status(500).json({message: err.message})
    }
}

exports.getExecution = async(req,res)=>{
    try{
        const execution = await Execution.findOne({
                _id: req.params.id,
                userId: req.user.id
        })
        if(!execution){
            return res.status(404).json({message:"execution not found"})
        }

        res.json(execution)
    }catch(err){
        console.error(err)
        res.status(500).json({message: err.message})
    }
}

exports.getExecutions = async (req, res) => {
    try {

        const executions = await Execution
            .find({
                userId: req.user.id
            })
            .populate("workflowId", "name")
            .sort({
                startedAt: -1
            });

        res.json(executions);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        });
    }
};

exports.getWorkflows = async (req, res) => {

 try {

  const workflows = await Workflow.find({
    userId: req.user.id
  })

  res.json(workflows)

 } catch (err) {
    console.error(err)
  res.status(500).json({ message: err.message })
 }

}


exports.getWorkflow = async (req, res) => {

 try {
    console.log("=== GET WORKFLOW ===");
    const workflow = await Workflow.findOne({
            _id: req.params.id,
            userId: req.user.id
    })

  if (!workflow) {
   return res.status(404).json({ message: "Workflow not found" })
  }

  res.json(workflow)

 } catch (err) {
    console.error(err)
  res.status(500).json({ message: err.message })
 }

}




const {Workflow, Execution} = require("../db/schemas");
const {startExecution} = require("../engine/executorEngine");

exports.createWorkflow = async (req, res) =>{
    try{
        const workflow = await Workflow.create({
            ...req.body,
            // userId: req.user.id
        })
        res.json(workflow)
    }catch(err){
        res.status(500).json({message: err.message})
    }
};

exports.runWorkflow = async (req,res)=>{
    try{
        const workflowId = req.params.id

        const workflow = await Workflow.findById(workflowId)
        if(!workflow){
            return res.status(404).json({Message:"workflow not found"})
        };

        const execution = await startExecution(
            workflowId,
            null
            // req.user.id
        )
        res.json({
            message:"Execution started ",
            executionId: execution._id
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.getExecution = async(req,res)=>{
    try{
        const execution = await Execution.findById(req.params.id)
        if(!execution){
            return res.status(404).json({message:"execution not found"})
        }

        res.json(execution)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.getWorkflows = async (req, res) => {

 try {

  const workflows = await Workflow.find()

  res.json(workflows)

 } catch (err) {
  res.status(500).json({ message: err.message })
 }

}


exports.getWorkflow = async (req, res) => {

 try {

  const workflow = await Workflow.findById(req.params.id)

  if (!workflow) {
   return res.status(404).json({ message: "Workflow not found" })
  }

  res.json(workflow)

 } catch (err) {
  res.status(500).json({ message: err.message })
 }

}




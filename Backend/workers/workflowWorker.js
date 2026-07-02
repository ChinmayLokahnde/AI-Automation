const { Worker } = require("bullmq")
const connection = require("../queue/redis")
const { Workflow, Execution } = require("../db/schemas")
const executors = require("../executors")
const { getNextNodes } = require("../engine/planner")
const mongoose = require("mongoose")
require("dotenv").config()



const path = require("path")
require("dotenv").config({
  path: path.join(__dirname, "../.env")
});




mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("mongo connected in worker"))
  .catch(err => console.log(err))

const worker = new Worker(

  "workflow-execution",

  async job => {

    console.log("job received:", job.data)

    const { executionId } = job.data

    try {

      const execution = await Execution.findById(executionId)

      if (!execution) {
        throw new Error("Execution not found")
      }

      execution.status = "running"
      await execution.save()

      const workflow = await Workflow.findById(execution.workflowId)
      console.log("Worker Execution ID:", execution._id.toString());
      console.log("Worker Context:", execution.context);

      if (!workflow) {
        throw new Error("workflow not exists")
      }

      const context = execution.context || {}
      const nodes = workflow.nodes
      const edges = workflow.edges

      const completedNodes = new Set()
      const allowedNodes = new Set(nodes.map(n => n.nodeId)) 


              console.log(
              "workflow nodes:",
              workflow.nodes.map(n => ({
                type: n.type,
                kind: n.kind,
                nodeId: n.nodeId
              }))
            )
      let readyNodes = nodes.filter(n => n.type === "trigger")

      if (readyNodes.length === 0) {
        throw new Error("No trigger node found")
      }

      while (readyNodes.length > 0) {

        console.log("Running batch:", readyNodes.map(n => n.nodeId))

        const results = await Promise.all(

          readyNodes.map(async (node) => {

            const executor = executors[node.type]

            if (!executor) {
              throw new Error(`Executor not found: ${node.type}`)
            }

            const result = await executor(node, context)

            return { node, result }
          })
        )

        for (const { node, result } of results) {

          context[node.nodeId] = result
          context[node.kind] = result
          console.log(context)
          completedNodes.add(node.nodeId)
          if (node.type === "condition") {

            const nextNodes = getNextNodes(node.nodeId, edges, result)

            const allTargets = edges
              .filter(e => e.source === node.nodeId)
              .map(e => e.target)

            for (const target of allTargets) {
              if (!nextNodes.includes(target)) {
                allowedNodes.delete(target)
              }
            }
          }
        }


        execution.context = context
        execution.currentNode = readyNodes.map(n => n.nodeId)

        await execution.save()

        readyNodes = nodes.filter(node => {

          if (completedNodes.has(node.nodeId)) return false
          if (!allowedNodes.has(node.nodeId)) return false

          const parents = edges
            .filter(e => e.target === node.nodeId)
            .map(e => e.source)

          return parents.every(p => completedNodes.has(p))
        })
      }
      execution.status = "success"
      execution.finishedAt = new Date()

      await execution.save()

      console.log("Workflow Execution completed")

    } catch (e) {

      console.error(" worker error:", e.message)

      const execution = await Execution.findById(executionId)

      if (execution) {
        execution.status = "fail"
        await execution.save()
      }
    }
  },

  { connection }
)

console.log("Workflow worker started")
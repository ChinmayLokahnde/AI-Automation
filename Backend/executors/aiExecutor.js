module.exports = async (node, context) => {

 const inputNode = node.config?.inputNode
 const input = context[inputNode]

 return `AI processed: ${input}`
}
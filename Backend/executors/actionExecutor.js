module.exports = async (node, context) => {

 const inputNode = node.config?.inputNode
 const input = context[inputNode]

 console.log("Final output:", input)

 return "action completed"
}
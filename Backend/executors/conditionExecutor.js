module.exports = async(node, context)=>{
    console.log("condition executor running")
    const input = context[node.config.inputNode]

    let result = false

    switch(node.config.operator){
        case ">": result = input > node.config.value
        break
        case "<": result = input < node.config.value
        break
        case "==" : result = input == node.config.value
        break
        default:
            throw new Error("Invalid Operator")
    };
    return result
}
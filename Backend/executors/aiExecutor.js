module.exports = async (node, context) => {
    const {generate} = require("../services/aiService")
    const interpolate = require("../utils/interpolate")
    switch(node.kind){
        
        case "openAi":{
        
            const config = node.config || {}

            const prompt = interpolate(
                config.prompt,
                context
            );

            console.log("Ai prompt", config.prompt);

            const response = await generate(prompt);
            return{
                text: response
            }
        }
        default:
            return null;
    }
}
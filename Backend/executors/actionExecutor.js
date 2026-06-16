module.exports = async (node, context) => {

switch(node.kind){
    case "http":{
        const config = node.config || {};

        const response = await fetch(
            config.url,
            {
                method: config.method || "GET",
                headers:{
                    "Content-Type": "application/json"
                },
                body:
                config.method !== "GET"
                ? JSON.stringify(config.body || {})
                : undefined
            }
        );
        const data = await response.json();
        return data

    }

    default:
        return "action completed"
}
}
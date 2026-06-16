module.exports = async (node, context) => {

switch(node.kind){
    case "http":{
        const config = node.config || {};
        const method = (config.method || "GET").toUpperCase();

        const options = {
            method,
            headers:{
                "Content-Type": "application/json"
            }
        };

        if(method !== "GET" && method !== "HEAD"){
            options.body = JSON.stringify(
                config.body || {}
            );
        }

        console.log("http config", config)

        const response = await fetch(
            config.url,
            options
        );

        const data = await response.json();
        console.log("http res", data)
        return data

    }

    default:
        return "action completed"
}
}
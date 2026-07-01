

module.exports = async (node, context) => {
    const {sendMail} = require("../services/emailService")
    const interpolate = require("../utils/interpolate")
   

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


    
    case "email": {
    const config = node.config || {};

    const subject = interpolate(
        config.subject,
        context
    );

    const body = interpolate(
        config.body,
        context
    );
    await sendMail({
        to: config.to,
        subject,
        body
    });

    console.log("email sent", config.to);

    return {
        sent: true
    };
}
    }


}
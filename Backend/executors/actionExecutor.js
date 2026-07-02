

module.exports = async (node, context) => {
    const {sendMail} = require("../services/emailService")
    const interpolate = require("../utils/interpolate")
   

switch(node.kind){
    case "http": {

    const config = node.config || {};

    
    const url = interpolate(
        config.url || "",
        context
    );

    const method = (
        config.method || "GET"
    ).toUpperCase();

  
    const headers = {};

    for (const header of (config.headers || [])) {

        if (!header.key) continue;

        headers[header.key] = interpolate(
            header.value || "",
            context
        );
    }

    if (!headers["Content-Type"]) {
        headers["Content-Type"] =
            "application/json";
    }

    const options = {
        method,
        headers,
    };

    if (
        method !== "GET" &&
        method !== "HEAD" &&
        config.body
    ) {

        const body = interpolate(
            config.body,
            context
        );

        options.body = body;
    }

    console.log("HTTP Request");

    console.log({
        url,
        method,
        headers,
        body: options.body
    });

    const response = await fetch(
        url,
        options
    );

    let data;

    try {

        data = await response.json();

    } catch {

        data = await response.text();

    }

    console.log("HTTP Response");

    console.log({
        status: response.status,
        data
    });

    return {

        status: response.status,

        headers: Object.fromEntries(
            response.headers
        ),

        body: data
    };
}


    
    case "email": {
    const config = node.config || {};


    const to = interpolate(
        config.to,
        context
    )

    const subject = interpolate(
        config.subject,
        context
    );

    const body = interpolate(
        config.body,
        context
    );

    console.log("Email Node Config:", config);

    console.log("Interpolated:");
    console.log({
        to,
        subject,
        body,
    });
    await sendMail({
        to,
        subject,
        body
    });

   console.log("Email sent to:", to);

    return {
        sent: true
    };
}
    }


}
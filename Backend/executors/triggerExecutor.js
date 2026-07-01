module.exports = async (node, context) => {

    switch (node.kind) {

        case "webhook":
            return context.webhook || {};

        case "schedule":
            return {
                timestamp: new Date().toISOString()
            };

        default:
            return {};
    }

};
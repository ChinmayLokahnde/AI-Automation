const interpolate = require("../utils/interpolate");

module.exports = async (node, context) => {
    console.log("Condition executor running");

    const config = node.config || {};

    const field = interpolate(
    config.field,
    context

    
);

    const value = config.value;

    let result = false;

    switch (config.operator) {

    case ">":
        result = Number(field) > Number(value);
        break;

    case "<":
        result = Number(field) < Number(value);
        break;

    case "==":
        result = field == value;
        break;

    case "!=":
        result = field != value;
        break;

    case "contains":
        result = String(field).includes(value);
        break;

    case "startsWith":
        result = String(field).startsWith(value);
        break;

    case "endsWith":
        result = String(field).endsWith(value);
        break;

    case "exists":
        result = field !== undefined && field !== null;
        break;

    case "empty":
        result = field === "";
        break;

    default:
        throw new Error(`Invalid operator: ${config.operator}`);
}
console.log("Condition Config:", config);
console.log("Resolved Field:", field);

    console.log({
        field,
        operator: config.operator,
        value,
        result
    });

    return result;
};
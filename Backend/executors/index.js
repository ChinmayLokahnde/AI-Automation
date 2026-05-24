const triggerExecutor = require("./triggerExecutor")
const aiExecutor = require("./aiExecutor")
const actionExecutor = require("./actionExecutor")
const conditionExecutor = require("../executors/conditionExecutor");

module.exports = {
 trigger: triggerExecutor,
 ai: aiExecutor,
 action: actionExecutor,
 condition: conditionExecutor
}
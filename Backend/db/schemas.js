const mongoose = require ("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    username : String,
    password : String,
    email:{
        type:String,
        unique: true
    }
})

const NodeSchema = new Schema({
    nodeId:{
        type:String,
        requried: true,
    },
    type:{
        type:String,
        enum:['trigger', 'action', 'ai', 'condition'],
        required: true,
    },
    kind:{
        type:String,
        required:true
    },
    metadata:{
        name: String,
        description: String,
        version: Number
    },

    config: mongoose.Schema.Types.Mixed,
    inputs:[String],
    outputs:[String],

    position:{
        x:Number,
        y:Number
    }
}, {_id:false})

const EdgeSchema = new Schema({
    edgeId:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true
    },
    target:{
        type:String,
        required:true
    },
    sourceHandle:String,
    targetHandle:String,
    condition:String
}, {_id:false})


const WorkflowSchema = new Schema({
    name:String,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    nodes:[NodeSchema],
    edges:[EdgeSchema],
})


const ExecutionSchema = new Schema({
    workflowId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workflow",
        requried:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requried:true
    },

    status:{
        type:String,
        enum:['running', 'success', 'fail' ],
        default: "running"
    },

    context:{
        type: mongoose.Schema.Types.Mixed,
        default:{}
    },

    currentNode:[String],

    startedAt:{
        type:Date,
        default:Date.now
    },
    finishedAt:Date
})

const User = mongoose.model("User", UserSchema);
const Workflow = mongoose.model("Workflow", WorkflowSchema);
const Execution = mongoose.model("Execution", ExecutionSchema);

module.exports = {
    User,
    Workflow,
    Execution
}



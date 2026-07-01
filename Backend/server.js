const express = require ("express");
const authRoutes = require("./routes/authRoutes");
const connectDb = require("./db/dbconfig");
require("dotenv").config()
const workflowRoute = require("./routes/workflowRoute");
const webhookRoute = require("./routes/webhookRoutes")
const cors = require("cors")



const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/workflow", workflowRoute);
app.use("/api/webhook", webhookRoute);

connectDb();

app.listen(5000, ()=>{
    console.log("server is running on port 5000")
});

const express = require ("express");
const authRoutes = require("./routes/authRoutes");
const connectDb = require("./db/dbconfig");
require("dotenv").config()
const workflowRoute = require("./routes/workflowRoute");


const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/workflow", workflowRoute)

connectDb();

app.listen(5000, ()=>{
    console.log("server is running on port 5000")
});

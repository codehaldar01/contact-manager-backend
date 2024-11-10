const express = require('express');
const dotenv = require('dotenv').config();
const errHandler = require("./middleware/errorHandling")
const connectDb = require('./config/dbConnection')
connectDb();
const app = express()
const port= process.env.PORT || 5000;
app.use(express.json());
app.use("/api/contacts",require("./Routes/myContact"))
app.use("/api/users",require("./Routes/usersRoute"))
app.use(errHandler)

app.listen(port,()=>{
    console.log(`runnig on ${port}`)
})
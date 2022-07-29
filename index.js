const express = require('express')
const cors = require("cors")
const app = express()   
const port = process.env.PORT || 4001
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);

const productRouter = require("./src/routes/product");

app.use(express.json())
app.use(cors())
app.use(productRouter);

server = app.listen(port,()=>{
    console.log("Server running on: " + port)
});

module.exports=server

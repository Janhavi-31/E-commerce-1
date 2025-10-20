const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://janhavinarkhede:<g6mgnCLL5TRQFxwt>@cluster0.krbtlnr.mongodb.net/e-commerce")

//API Creation
app.listen(port,()=>{
    if (!error) {
        console.log("Server Runniing on Port" +port)
    }
    else{
        console.log("Error: "+error)
    }
})
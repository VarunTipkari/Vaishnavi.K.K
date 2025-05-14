const mongoose = require('mongoose');
const dotenv = require('dotenv');   
const express = require('express');
dotenv.config();
const uri = process.env.ATLAS_URI;

const app = express();

app.use(express.json());

mongoose.connect(uri)
.then(() => app.listen(5001,()=>console.log("Server running at 5001!")))
.catch((err)=>console.log(err));


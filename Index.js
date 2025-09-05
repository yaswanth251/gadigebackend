const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CreateSchema = require('./Model');
const app = express();
dotenv.config();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

app.post('/register', async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const existingUser = await CreateSchema.findOne({email});   
        if(existingUser){
            return res.status(400).json({msg:"User already exists"});
        }   
        const newUser = new CreateSchema({name,email,password});
        await newUser.save();
        res.status(200).json({msg:"User registered successfully"});
    }catch(err){
        res.status(500).send("Server Error");
    }
})

app.listen(5000, () => {
    console.log("Server is running on port 5000");

});
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./person-model');

mongoose.set('stringQuery', false);

const app = express();
app.use(bodyParser.json());
app.listen(3000, async() => {
    console.log('Server is running on port 3000');
    
    const mongoUri = "mongodb+srv://ahdosj:%40Skt121497@cluster0.smpwmm7.mongodb.net/clone-code?retryWrites=true&w=majority";
    
    mongoose.connect(mongoUri, {useNewUrlParser:true})
        .then(() => console.log('Connected to MongoDB'))
})

app.get("/person", async(req, res) => {
    const person = await Person.find();
    res.send(person);
})

app.get("/person/:email", async(req, res) => {
    const person = await Person.findOne({email: req.params.email});
    res.send(person);
})

app.post("/person", async(req, res) => {
    const person = new Person(req.body);
    await person.save();
    res.send(person);
})

app.put("/person/:email", async(req, res) => {
    const person = await Person.findOneAndUpdate(
        {email : req.params.email},
        {$set: req.body},
        { new : true}
    )
    console.log(person);
    res.send(person);
})

app.delete("/person/:email", async(req, res) => {
    await Person.deleteMany({email: req.params.email});
    res.send({success : true, message: "Deleted successfully"});
})
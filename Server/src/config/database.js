import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/local', ()=>{
    console.log("Connected to DB!")
}, e => console.log(e));


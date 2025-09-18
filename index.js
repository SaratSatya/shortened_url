const express=require('express');
const {connectToMongoDB}=require('./connection.js')
const urlRoute = require('./routes/url.js');  // no { }


const app=express();
const PORT=8001 // For now, not defining in the environment variables

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>{
    console.log("MongoDB connected via mongoose")
})

app.use(express.json());


app.use("/url",urlRoute);

app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`));

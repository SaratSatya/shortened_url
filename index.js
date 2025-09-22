const express=require('express');
const {connectToMongoDB}=require('./connection.js')
const urlRoute = require('./routes/url.js');  // no { }
const URL=require('./models/url.js')
const staticRoute=require('./routes/staticRouter.js')
const userRoute=require('./routes/user.js')
const path=require("path")
const cookieParser=require('cookie-parser')
const {restrictToLoggedinUserOnly,checkAuth} =require('./middleware/auth');


const app=express();
const PORT=8001 // For now, not defining in the environment variables

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>{
    console.log("MongoDB connected via mongoose")
})

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.use("/url",restrictToLoggedinUserOnly,urlRoute);
app.use('/',checkAuth,staticRoute);
app.use('/user',userRoute);

app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`));

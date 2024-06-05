const express= require("express");
const app=express();
const PORT=4000;
const path=require("path")
const mongoose=require("mongoose")
const cookieparser=require("cookie-parser");
const session = require('express-session');


const userrouter=require('./routes/user')
const blogrouter=require("./routes/blog")
const { checkForAunthenticationCookie } = require("./middlewares/authen");


const Blog=require("./models/blog")
mongoose.connect("mongodb+srv://data:dinesh@atlascluster.jwuyykx.mongodb.net/blogdata").then((e)=>console.log("mongodb connected"))

app.set("view engine","ejs")
app.set('views',path.join("./views"));
app.use(express.urlencoded({extended:false}))


app.use(session({
    secret: 'dinesh#23',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


app.use(cookieparser());
app.use(express.static(path.join("./public")))


app.use('/user',userrouter);
app.use(checkForAunthenticationCookie);
app.use('/blog',checkForAunthenticationCookie,blogrouter)

app.get('/',async (req,res)=>{
    const allblogs= await Blog.find({})
        res.render("home",{
            user:req.user,
            blogs:allblogs,
        })
        
        ;})
    

app.listen(PORT,console.log("server running on port 4000"))
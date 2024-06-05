const express=require("express");
const router=express.Router();
const user=require("../models/user")

router.get("/signin",(req,res)=>{
    return res.render("signin");

});


router.get("/signup",(req,res)=>{
    return res.render("signup");

});
router.post("/signup",async (req,res)=>{
    const {fullname,email,password}=req.body;
    const stored= await user.create({
        fullname,
        email,
        password,
    });
    res.redirect('/user/signin')



})
router.post("/signin",async (req,res)=>{
    const {email,password}=req.body;
    try
    {const token=await user.matchPasswordAndGenerateToken(email,password)

    return res.cookie("token",token).redirect("/");}
    catch(error){
        res.render('signin',{error:'incorrect email or password'})
    }
})

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports=router;

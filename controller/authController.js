const express=require('express');
const userModel=require('../Models/userModel');
const validate=require('deep-email-validator');
const bcrypt=require("bcrypt");

const jwt=require('jsonwebtoken');
const JWT_KEY='123@tets'

const crypto=require('crypto')

const nodemailer=require('nodemailer')
const emailValidator= require('deep-email-validator');
const emailExistence=require('email-existence')
 

//creating transport for mail sending

var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'aachalmandloi323@gmail.com',
        pass:'jrdodnnqjdudnskd'
    },
    tls:{
        rejectUnauthorized:false 
    }
})

//signup function for user......


module.exports.signup=async function signup(req,res)
{
    try{
             
        const data=req.body.email;
       
            const userex=await userModel.findOne({email:data}); 
   
         if(userex)
         {
            res.render('signup',{error:true,message:"User Already Exists"})
         }

    else
    {     
     const pass=req.body.password
     const cf=req.body.confirmPassword;

     if(pass===cf)
     {
   const user=new userModel({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    confirmPassword:req.body.confirmPassword,
    emailToken:crypto.randomBytes(64).toString('hex'),
    verified:false
   });


  const newuser= await user.save();
  //send mail after register

  //send email after register

  var mailOptions={
    from:' "Verify your email" <aachalmandloi323@gmail.com>',
    to:user.email,
    subject:'Bookera -verify your email',
    html: `<h2> ${user.name} !! Thanks for registering on our site </h2>
            <h3> Please verify your email to continue....</h3>
            <a href="http://${req.headers.host}/users/verify-email?token=${user.emailToken}">Verify your email.Click here!!!</a>`
     
  }

  transporter.sendMail(mailOptions,function(error, info){
    if(error)
    {
        console.log(error)
    }
    else{
        console.log("email verification link send")
    }
  })


//   return res.redirect('/');
  res.render('login', { notvalid: false,message:"An email is sent to your mail. Kindly verify it then log in."});
  console.log("signed up");
 }


else{
    res.render('signup',{error:true,message:"Password and Confirm Password Doesn't match"})
  
}
    }
    }
catch(err)
{
    res.render('signup',{error:true,message:"Enter password of minimum length 5"})
}
  

}


//verify mail 
module.exports.verifymail=async function(req,res)
{
    try{
     const token=req.query.token
     const user=await userModel.findOne({emailToken:token})
     if(user)
     {
        user.emailToken=null
        user.verified=true
        await user.save()
        // res.redirect('/users/login')
        // res.redirect('/users/login', { notvalid: false,message:" Your E-mail is verified successfully. Please login."});
        res.render("emailverified")
     }
     else{
        res.redirect('/users/signup')
        console.log('mail not verified')
     }
    }
    catch(err){
          console.log(err);
    }
}

//before login

module.exports.beforelogin=async function(req,res,next)
{
  try{
   const user=await userModel.findOne({email:req.body.email})
   if(user)
   {
   if(user.verified)
   {
    next();

   }
   
   else{
    // console.log("please verify your mail first");
    res.render('login', { notvalid: true,message:" Kindly verify your mail first.An email has been sent to your mail."});
   }
  }
  else{
    res.render('login', { notvalid: true,message:" User Not Found."});

  }
}
  catch(err){
    return res.json({
        message222:err
    })
  }
}

//login funtion  for user..........

{
    module.exports.login=async function login(req,res)
    {
     try{
         let data=req.body.email;
         let datapass=req.body.password;
    
         let user= await userModel.findOne({email:data});
    
         if(user)
    
         {
    
             if(user.password==datapass)
    
             {
                   //payload 
                   let uid=user['_id'];
                   let tokenn=jwt.sign({payload:uid},JWT_KEY);        //making signature
                   res.cookie('login',tokenn,{httpOnly:true});
              
                   return res.redirect('/');
             }
    
             else{
            //    return  res.json({
            //          msg:"please enter valid credentials"
            //      });
            res.render('login', { notvalid: true,message:"You have entered wrong credentials.Try again."});
               
             }
    
         }
         else
         {
            res.render('login', { notvalid: true,message:"User Not found"});
          
         }
    }
    catch(err)
    {
         return res.json({
             msg:err.message
         })
    }
    }
    
}




 module.exports.signupform=function signupform(req,res)
 {
   res.render("signup",{error:false,message:"Welcome to BookEra"});

 }

 module.exports.loginform=function loginform(req,res)
 {
   res.render("login",{notvalid:false,message:""});

 }

 module.exports.logoutuser=function logoutuser(req,res)
 {
    res.cookie('login',' ',{maxAge:1});
   
return res.redirect('/');
 }

const express=require('express');

const userRouter=express.Router();


const{signup,login,signupform,loginform,logoutuser,verifymail,beforelogin}=require('../controller/authController');

userRouter
.route('/signup')
.get(signupform)
.post(signup);

userRouter
.route('/login')
.get(loginform)
.post(beforelogin,login)

userRouter
.route('/logout')
.get(logoutuser)

userRouter
.route('/verify-email')
.get(verifymail)

module.exports=userRouter;
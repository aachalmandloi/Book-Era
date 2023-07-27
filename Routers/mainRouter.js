const express=require('express');


const mainRouter=express.Router();

const{checklogin,mainpage}=require('../controller/mainController');

mainRouter
.route('/')
.get(checklogin,mainpage)



module.exports=mainRouter;
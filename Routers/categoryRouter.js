const express=require('express');

const categoryRouter=express.Router();
// const bodyParser=require("body-parser");
// categoryRouter.use(bodyParser.json());
// categoryRouter.use(bodyParser.urlencoded({extended:true}));







 const{csebook,civilbook,mechbook,ecbook,examref,novelfic}=require('../controller/bookController');


categoryRouter
.route('/cse')
.get(csebook)



categoryRouter
.route('/civil')
.get(civilbook)

categoryRouter
.route('/mechanical')
.get(mechbook)

categoryRouter
.route('/electrical')
.get(ecbook)


categoryRouter
.route('/novelfiction')
.get(novelfic)

categoryRouter
.route('/examrefrence')
.get(examref)


module.exports=categoryRouter;
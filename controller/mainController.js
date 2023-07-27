const express=require('express');
 const userModel=require('../Models/userModel');
 const blogModel=require('../Models/blogModel')


const jwt=require('jsonwebtoken');
const JWT_KEY='123@tets'

module.exports.checklogin= async function  checklogin(req,res,next)
{
     if(req.cookies.login)
     {
        let userLogin=jwt.verify(req.cookies.login,JWT_KEY,async (err, decoded) => {
          if (err) {
            res.status(401).end();
          } else {
            res.locals.JWT = decoded;
            const user = await userModel.findOne({ id: decoded.id  });
            console.log(user)
            if (!user) return res.status(404).send({ message: 'No user found' });
            req.user = user;
            next();
          }
        });
        
        // if(userLogin)
        // {
        //     next();
        // }
        // else{
        //     return res.json({
        //         message:'user is not valid'
        //     });
        // }
     }

     else{
        const limitNumber = 4;
        // const categories = await Category.find({}).limit(limitNumber);
                const latest = await blogModel.find({}).sort({_id: -1}).limit(limitNumber);
                const placement = await blogModel.find({ 'category': 'Placement' }).limit(limitNumber);
                const  business= await blogModel.find({ 'category': 'Business' }).limit(limitNumber);
                const corporate = await blogModel.find({ 'category': 'Corporate' }).limit(limitNumber);
                const enterprenour = await blogModel.find({ 'category': 'Enterprenour' }).limit(limitNumber);
                const blog = { latest, placement, business, corporate,enterprenour };
            
                
       res.render('home',{blog});
     }
}

module.exports.mainpage= async function mainpage(req,res)
{

    try {
        const limitNumber = 4;
// const categories = await Category.find({}).limit(limitNumber);
        const latest = await blogModel.find({}).sort({_id: -1}).limit(limitNumber);
        const placement = await blogModel.find({ 'category': 'Placement' }).limit(limitNumber);
        const  business= await blogModel.find({ 'category': 'Business' }).limit(limitNumber);
        const corporate = await blogModel.find({ 'category': 'Corporate' }).limit(limitNumber);
        const enterprenour = await blogModel.find({ 'category': 'Enterprenour' }).limit(limitNumber);
        const blog = { latest, placement, business, corporate,enterprenour };
    
        res.render('success', { blog } );
      } catch (error) {
        res.send({message: error.message || "Error Occured" });
      }
    }

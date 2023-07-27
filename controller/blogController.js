const express=require('express');

 
 
 const blogRouter = require('../Routers/blogRouter');
 const blogModel=require('../Models/blogModel');
 

// const jwt=require('jsonwebtoken');
// const JWT_KEY='123@tets'


module.exports.blogForm= function blogForm(req,res){
    // const infoErrorsObj=req.flash('infoErrors');
    // const infoSubmitObj = req.flash('infoSubmit');
    res.render("submit-blog" );

}


module.exports.submitblog= async function submitblog(req,res)
{
    try{
       
    
        
     
        const blogdetail=new blogModel({
            name: req.body.name,
            blogname:req.body.blogname,
            category:req.body.category,
             image:req.file.filename,
            discription:req.body.discription

     

        });
        console.log(req.body);
            const blogadded=await blogdetail.save();

            req.flash('infoSubmit', 'Blog has been added.')
            res.redirect('/');
    
            
        }
        
    
    

    catch(err){
        req.flash('infoErrors', err);
        res.redirect('/explore/addblog');
    }
}


 module.exports.explorelatest = async  function explorelatest(req, res) {
  try {
    const limitNumber = 20;
    const blog = await blogModel.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('blogpage', {blog} );
  }
   catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 


module.exports.exploreblogid=async function(req,res){
    try{
          let blogId=req.params.id;
          const blog=await blogModel.findById(blogId);
          res.render('particularblog',{blog});


    }

    catch(error) {

        res.send({message:error.message|| "Error Occured"});

    }
}
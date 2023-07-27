const express=require('express');
 const userModel=require('../Models/userModel');
 
 const bookModel = require('../Models/bookModel')
 const bookRouter = require('../Routers/bookRouter');
 const blogModel=require('../Models/blogModel')
//  const categoryRouter = require('../Routers/categoryRouter');
 

const jwt=require('jsonwebtoken');
const JWT_KEY='123@tets'




module.exports.checklogin=function checklogin(req,res,next)
{
     if(req.cookies.login)
     {
        let userLogin=jwt.verify(req.cookies.login,JWT_KEY);
        if(userLogin)
        {
            next();
        }
        else{
            return res.json({
                message:'user is not valid'
            });
        }
     }

     else{
        return res.redirect('/users/login');
     }
}



module.exports.addbookForm=function addbookForm(req,res){
    res.render("sellbook",{error:-1});

}


module.exports.sellbooks= async function sellbooks(req,res)
{
    try{
     
        const bookdetail=new bookModel({
            bookname: req.body.bookname,
            authorname:req.body.authorname,
            year:req.body.year,
            rent:req.body.rent,
            sell:req.body.sell,
            price:req.body.price,
            condition:req.body.condition,
            category:req.body.category,
            contact:req.body.contact,
            email:req.body.email,
            bookimage:req.file.filename
             

        });
         
        const num=req.body.contact;
        if(num.length>10)
        {
          res.render('sellbook',{error:1})
        }
        if(num.length<10)
        {
          res.render('sellbook',{error:1})
        }
        if(num.charAt(0)!=9 && num.charAt(0)!=8 && num.charAt(0)!=7 && num.charAt(0)!=6)
        {
          res.render('sellbook',{error:1})
        }
else{
  console.log(req.body);
  const addedbook=await bookdetail.save();

  //res.render("success"); 
  // const limitNumber = 4;
  // // const categories = await Category.find({}).limit(limitNumber);
  //         const latest = await blogModel.find({}).sort({_id: -1}).limit(limitNumber);
  //         const placement = await blogModel.find({ 'category': 'Placement' }).limit(limitNumber);
  //         const  business= await blogModel.find({ 'category': 'Business' }).limit(limitNumber);
  //         const corporate = await blogModel.find({ 'category': 'Corporate' }).limit(limitNumber);
  //         const enterprenour = await blogModel.find({ 'category': 'Enterprenour' }).limit(limitNumber);
  //         const blog = { latest, placement, business, corporate,enterprenour };
      
          // res.render('success', { blog } );
          let userLogin=jwt.verify(req.cookies.login,JWT_KEY,async (err, decoded) => {
            res.locals.JWT = decoded;
            const user = await userModel.findOne({ id: decoded.id  });
            console.log(user)
            console.log(user.email)
                const book= await bookModel.find({email:user.email});
          

          res.render('userbook',{msg:'Book Added Successfully',book});
          });
}
              
        }
        
    
    

    catch(err){
        res.json({
            message:err.message
        });

    }
}


module.exports.purchasewindow= async function purchasewindow(req,res)
{
  const limitNumber = 15;
  const allbookcatwise=0;
  // const categories = await Category.find({}).limit(limitNumber);
          const latest = await bookModel.find({}).sort({_id: -1}).limit(limitNumber);
          // const mech = await bookModel.find({ 'category': 'Mechanical Engineering' }).limit(limitNumber);
          // const  cs= await bookModel.find({ 'category': 'Computer Science Engineering' }).limit(limitNumber);
          // const civil = await bookModel.find({ 'category': 'Civil Engineering' }).limit(limitNumber);
          // const ec = await bookModel.find({ 'category': 'Electrical Engineering' }).limit(limitNumber);
          // const novel = await bookModel.find({ 'category': 'Novel and fictional' }).limit(limitNumber);
          // const ref = await bookModel.find({ 'category': 'Exam Refrences' }).limit(limitNumber);
          const books = { latest };
          
      
    res.render("imagesPage",{allbookcatwise,books,all:1,cse:0,mech:0,ec:0,cv:0,novel:0,exam:0,dialog:0});  
}

module.exports.csebook = async function csebook(req,res)
{
    try {
       const books='';
        const allbookcatwise = await bookModel.find({category:'Computer Science Engineering'});
        // res.render('cse', { allbookcatwise } );
        res.render("imagesPage",{allbookcatwise,books,all:0,cse:1,mech:0,ec:0,cv:0,novel:0,exam:0,dialog:0});  
      } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
      }

}



module.exports.mechbook = async function mechbook(req,res)
{
    try {
       const books='';
        const allbookcatwise = await bookModel.find({category:'Mechanical Engineering'});
        res.render("imagesPage",{allbookcatwise,books,all:0,cse:0,mech:1,ec:0,cv:0,novel:0,exam:0,dialog:0});
      } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
      }

}




module.exports.ecbook = async function ecbook(req,res)
{
    try {
       const books='';
        const allbookcatwise = await bookModel.find({category:'Electrical Engineering'});
          console.log(allbookcatwise.length)
        res.render("imagesPage",{allbookcatwise,books,all:0,cse:0,mech:0,ec:1,cv:0,novel:0,exam:0,dialog:0});
      } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
      } 

}




module.exports.novelfic = async function novelfic(req,res)
{
    try {
        const books='';
        const allbookcatwise = await bookModel.find({category:'Novel and fictional'});
       // console.log(allbookcatwise.length)
        res.render("imagesPage",{allbookcatwise,books,all:0,cse:0,mech:0,ec:0,cv:0,novel:1,exam:0,dialog:0});
      } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
      }

}




module.exports.examref = async function examref(req,res)
{
    try {
       const books='';
        const allbookcatwise = await bookModel.find({category:'Exam Refrences'});
        res.render("imagesPage",{allbookcatwise,books,all:0,cse:0,mech:0,ec:0,cv:0,novel:0,exam:1,dialog:0});
      } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
      }

}




module.exports.civilbook = async function civilbook(req,res)
{
    try {
       const books='';
        const allbookcatwise = await bookModel.find({category:'Civil Engineering'});
        res.render("imagesPage",{allbookcatwise,books,all:0,cse:0,mech:0,ec:0,cv:1,novel:0,exam:0,dialog:0});
      } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
      }

}




module.exports.searchbook= async function searchbook(req,res)
{
  try {
    let searchbook = req.body.searchbook;
    console.log(searchbook)
    let book = await bookModel.find( { $text: { $search: searchbook, $diacriticSensitive: true } });
    console.log(book);
    res.render('search', { book } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}


module.exports.bookdetail=async function(req,res){
  try{
        let bookId=req.params.id;
        const book=await bookModel.findById(bookId);
       
        if(book)
        {
          console.log(book);
       
          book.available=false
          const books='';
          const allbookcatwise='';
         await book.save();
         res.render("imagesPage",{allbookcatwise,books,all:0,cse:0,mech:0,ec:0,cv:0,novel:0,exam:0,dialog:1});

       
          
      
        }
        
    


  }

  catch(error) {

      res.send({message:error.message|| "Error Occured"});

  }
}

module.exports.userbook= async function  userbook(req,res)
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
            console.log(user.email)
                const book= await bookModel.find({email:user.email});
              // console.log(book);
              
                res.render('userbook',{book,msg:'Your added books are'});
            
            
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
      return res.redirect('/users/login');
     }
}


module.exports.deletebook=async function  deletebook(req,res)
{
  try{
    let book='';
let id=req.params.id;
let books=await bookModel.findByIdAndDelete(id);
let userLogin=jwt.verify(req.cookies.login,JWT_KEY,async (err, decoded) => {
  res.locals.JWT = decoded;
  const user = await userModel.findOne({ id: decoded.id  });

      const book= await bookModel.find({email:user.email});
    // console.log(book);
    
      res.render('userbook',{book,msg:'Book Deleted successfully'});
});
  }
catch(err)
    {
        res.json({
          message:err
        })
 }  

}

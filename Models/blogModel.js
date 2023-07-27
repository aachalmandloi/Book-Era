const mongoose=require('mongoose');
//  const emailValidator=require('email-validator');


  const db_link='mongodb+srv://admin:3uNOa6LEHhLSBFVW@cluster0.asbyjsh.mongodb.net/?retryWrites=true&w=majority';
 mongoose.connect(db_link)
 .then(()=>
 {
   
    console.log("db connected");
 })
 .catch((err)=>
 
    console.log(err));
 


    const blogSchema=mongoose.Schema({
        name:
        {
            type:String      
        },
        blogname:
        {
            type:String     
        },
       
        category:
        {
            type:String
        },
        
        image:
        {
            type:String
        },
        discription:
        {
            type:String
        }

});


const blogModel=mongoose.model('blogModel',blogSchema);

module.exports=blogModel;
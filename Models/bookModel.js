const mongoose=require('mongoose');
 const emailValidator=require('email-validator');


  const db_link='mongodb+srv://admin:3uNOa6LEHhLSBFVW@cluster0.asbyjsh.mongodb.net/?retryWrites=true&w=majority';
 mongoose.connect(db_link)
 .then(()=>
 {
   
    console.log("db connected");
 })
 .catch((err)=>
 
    console.log(err));
 


    const bookSchema=mongoose.Schema({
        bookname:
        {
            type:String      
        },
        authorname:
        {
            type:String     
        },
        year:
        {
            type:String
        },
        rent:
        {
            type:String
        },
        sell:
        {
           type:String
        },
        price:
        {
            type:String  
        },
        condition:
        {
            type:String
        },
        category:
        {
            type:String
        },
         contact:
        {
            type:Number
        },
        email:
        {
            type:String
        },
        bookimage:
        {
            type:String
        },
        available:{
            type:Boolean,
            default:true
        }

});
bookSchema.index({  bookname: 'text'});

const bookModel=mongoose.model('bookModel',bookSchema);

module.exports=bookModel;
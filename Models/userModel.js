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
 

   // 3uNOa6LEHhLSBFVW
    

 const userSchema=mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        email:
        {
            type:String,
            unique:true,
            required:true,
            validate:function(){
                return emailValidator.validate(this.email);
            }
        },
        password:{
            type:String,
            required:true,
            minlength:5,
            maxlength:16

        },
        confirmPassword:{
            type:String,
           // required:true,
            validate:function(){
                return this.confirmPassword==this.password;
            }
        },
        emailToken:{
               type:String,
              // required:true
        },
        verified:{
            type:Boolean,
            //default:false
        },
        date:{
            type:Date,
            default:Date.now()  
        }
    }
 );





 userSchema.pre('save',function()
 {
   
   this.confirmPassword=undefined;    
 });

 
 const userModel=mongoose.model('userModel',userSchema);

module.exports=userModel;

const express=require('express');

const blogRouter=express();

const bodyParser=require("body-parser");
blogRouter.use(bodyParser.json());
blogRouter.use(bodyParser.urlencoded({extended:true}));




const multer=require('multer');
const path=require("path");
blogRouter.use(express.static('public'));

const{explorelatest,blogForm,submitblog,exploreblogid}=require('../controller/blogController');


const{checklogin}=require('../controller/bookController');


const storage=multer.diskStorage({
   destination:function (req,file,cb){
cb(null,path.join(__dirname,'../public/blogimages'));
   },
   filename:function(req,file,cb){
       const namee=Date.now()+'_'+file.originalname;
      cb(null,namee);
   }
});
const upload=multer({storage:storage});

blogRouter
.route('/addblog')
.get(checklogin,blogForm)
.post(upload.single('image'),submitblog)

blogRouter
.route('/blogs')
.get(explorelatest)


blogRouter
.route('/blogs/:id')
.get(exploreblogid)






module.exports=blogRouter;
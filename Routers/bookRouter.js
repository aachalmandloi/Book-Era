const express=require('express');

const bookRouter=express();
const bodyParser=require("body-parser");
bookRouter.use(bodyParser.json());
bookRouter.use(bodyParser.urlencoded({extended:true}));





 const multer=require('multer');
 const path=require("path");
 bookRouter.use(express.static('public'));



 const{addbookForm, sellbooks,purchasewindow,checklogin,searchbook,bookdetail,userbook,deletebook}=require('../controller/bookController');

const storage=multer.diskStorage({
    destination:function (req,file,cb){
 cb(null,path.join(__dirname,'../public/bookimages'));
    },
    filename:function(req,file,cb){
        const namee=Date.now()+'_'+file.originalname;
       cb(null,namee);
    }
});

// const filter=function(req,res,cb)
// {
//     if(file.mimetype)
// }
// const upload=multer({storage:storage});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });


bookRouter
.route('/add')
.get(checklogin,addbookForm)
.post(upload.single('bookimage'),sellbooks)

bookRouter
.route('/purchase')
.get(checklogin,purchasewindow)


bookRouter
.route('/search')
.post(searchbook)


bookRouter
.route('/detail/:id')
.get(bookdetail)



bookRouter
.route('/getuserbooks')
.get(userbook)

bookRouter
.route('/delete/:id')
.get(deletebook)



module.exports=bookRouter;
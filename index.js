const express=require('express');
//invoke  
const path=require("path");
const ejs=require("ejs");
const app=express();
const flash = require('connect-flash');
// const session = require('express-session');
const cookieParser=require('cookie-parser');
const dotenv=require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.listen(3000);
app.use(cookieParser());
// app.use(session({
//     secret: 'loginn',
//     saveUninitialized: true,
//     resave: true
//   }));
// const{checklogin}=require('./controller/bookController');

// const static_path=path.join(__dirname,"../public");
 
// app.use(express.static(static_path));
app.use(flash());
app.use(express.static(__dirname+'/public'));
app.set("view engine","ejs");

//mini app
const userRouter=require('./Routers/userRouter');
const bookRouter=require('./Routers/bookRouter');
const mainRouter=require('./Routers/mainRouter');
const blogRouter=require('./Routers/blogRouter');
const categoryRouter=require('./Routers/categoryRouter');




app.use('/users',userRouter);

app.use('/book',bookRouter);

app.use('/explore',blogRouter);

app.use('/category',categoryRouter);

app.use('/',mainRouter);

 


 

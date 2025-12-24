import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

const app =express();

app.use(express.urlencoded({extended:true}));

cloudinary.config({
    cloud_name: "dsvlsga7i",
    api_key: "821488419396286",
    api_secret: "LOiDclupO5NIU7UKk7u4O72SuhA",
});

mongoose.connect("mongodb+srv://apriyaverma14_db_user:FYnplfN31nScwMVg@cluster0.vllbcef.mongodb.net/",{
    dbName: "NodeJs_Mastery_Course",
}).then(console.log(`Mongo DB is Connected.....!!`))
.catch((err)=>console.log(err));

//Rendering login.ejs file.
app.get('/',(req,res)=>{
    res.render('login.ejs',{url:null});
})

app.get('/register',(req,res)=>{
    res.render("register.ejs",{url:null});
});

const storage = multer.diskStorage({
    filename: function (req,file,cb){
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null,file.fieldname+ "-"+ uniqueSuffix);
    },
});
const upload = multer({storage:storage});

//Creating Schema for Image
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    filename: String,
    imageUrl: String,
    public_id: String,
});

const User = mongoose.model("user",userSchema);

app.post('/register',upload.single("file"),async(req,res)=>{
    const file = req.file.path;

    const {name,email,password} = req.body;
    const cloudinaryRes = await cloudinary.uploader.upload(file,{
        folder: "NodeJs_Mastery_Course",
    });

    //Creating User
    const db = await User.create({
        name,
        email,
        password,
        filename: file.originalname,
        public_id: cloudinaryRes.public_id,
        imageUrl: cloudinaryRes.secure_url,
    });

    // res.render("register.ejs", {url: cloudinaryRes.secure_url});
    res.redirect('/');
});


//Post Login Route
app.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    let user = await User.findOne({email});
    if(!user){
        res.render('login.ejs');
    }
    else if(user.password != password){
        res.render('login.ejs');
    }else{
        res.render('profile.ejs',{user});
    }
});

const port=3000;
app.listen(port,()=>{console.log(`Server is running on port ${port}`)});
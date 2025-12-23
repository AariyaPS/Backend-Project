import express from "express";
import mongoose from "mongoose";
import {shortUrl,getOriginalUrl} from "./Controllers/url.js"

const app = express();

app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://apriyaverma14_db_user:FYnplfN31nScwMVg@cluster0.vllbcef.mongodb.net/",{
    dbName:"NodeJs_Mastery_Course"
}).then(()=>console.log(`Mongo DB Connected....!`))
.catch((error)=>console.log(error))

//rendering the ejs file
app.get('/',(req,res)=>{
    res.render("index.ejs",{shortUrl:null})
})

//shortening url logic
//whenever the shorten Url is button clicked, then according to form action it would be redirected to /short url
//then shortUrl  argument is looked for where it is defined
//Henceforth, it would redirect to Controllers/url.js
app.post('/short',shortUrl)


//redirect to long url
app.get('/:shortUrl',getOriginalUrl)

const port = 1000;

app.listen(port,console.log(`Server is running on the port ${port}`))
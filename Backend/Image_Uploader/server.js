import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

const app = express();

//CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dsvlsga7i
cloudinary.config({
    cloud_name: "dsvlsga7i",
    api_key: "821488419396286",
    api_secret: "LOiDclupO5NIU7UKk7u4O72SuhA",
});

mongoose.connect("mongodb+srv://apriyaverma14_db_user:FYnplfN31nScwMVg@cluster0.vllbcef.mongodb.net/", {
    dbName: "NodeJs_Mastery_Course",
}
).then(() => console.log(`Mongo DB is connected...!!`))
    .catch((err) => console.log(err));

//Multer package is a Node.js middleware used to upload files. Using Multer, file is uploaded then it would get saved in Cloudinary.

//rendering ejs file
app.get('/', (req, res) => {
    res.render("index.ejs", { url: null })
})

const storage = multer.diskStorage({
    //destination: "./public/uploads",
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
const upload = multer({ storage: storage });


//Creating schema for image
const imageSchema = new mongoose.Schema({
    filename: String,
    imageUrl: String,
    public_id: String,
});

const File = mongoose.model("Cloudinary", imageSchema);

app.post("/upload", upload.single("file"), async (req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const file = req.file.path;

    const cloudinaryRes = await cloudinary.uploader.upload(file,{
        folder: "NodeJs_Mastery_Course",
    })
    //Save to database
    const db = await File.create({
        filename: file.originalname,
        public_id: cloudinaryRes.public_id,
        imageUrl: cloudinaryRes.secure_url,
    });

    res.render("index.ejs", {url: cloudinaryRes.secure_url});

    //res.json({message:'File uploaded successfully', cloudinaryRes});
});

const port = 1000;
app.listen(port, () => console.log(`Server is running on the port ${port}`));

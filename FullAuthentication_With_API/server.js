import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './Routes/user.js';
import contactRouter from './Routes/contact.js';
import {config} from 'dotenv';


//bcrypt is being used for hashing passwords before storing them in the database
//Using jsonwebtoken for generating tokens for authentication and authorization

const app = express();
app.use(bodyParser.json());

config({path: './.env'});

mongoose.connect(process.env.MONGO_URI, {
    dbName: 'NodeJs_Mastery_Course',
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
})


app.get('/', (req, res) => {
    res.json({ message: "API is working" });
})

//user Routes
app.use('/api/user', userRouter);

//contact Router
app.use('/api/contact',contactRouter);

const port = process.env.PORT;
app.listen(port, () => { console.log(`Server is running on the port ${port}`) });
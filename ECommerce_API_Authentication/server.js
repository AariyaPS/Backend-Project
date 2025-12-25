import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {config} from 'dotenv';
import userRouter from './Routes/user.js';
import productRouter from './Routes/product.js';
import cartRouter from './Routes/cart.js';


//bcrypt is being used for hashing passwords before storing them in the database
//Using jsonwebtoken for generating tokens for authentication and authorization

const app = express();
app.use(bodyParser.json());

config({path: '.env'});

mongoose.connect(process.env.MONGO_URI, {
    dbName: 'ECommerce_API_Authentication',
}).then(() => {
    console.log("Connected to MongoDB...!!");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
})

//user router
app.use('/api/user',userRouter)

//product router
app.use('/api/product',productRouter);

//cart router
app.use('/api/cart',cartRouter)

//home route
app.get('/', (req, res) => {
    res.json({ message: "API is working" });
})



const port = process.env.PORT;
app.listen(port, () => { console.log(`Server is running on the port ${port}`) });
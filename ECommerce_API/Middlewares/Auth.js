import jwt from 'jsonwebtoken';
import {User} from '../Models/User.js';

export const isAuthenticated = async (req,res,next)=>{

    const token = req.header('Auth');

    if(!token) return res.status(400).json({message:"Login First!"})

    const decode = jwt.verify(token,process.env.JWT);
    const id = decode.userId;

    let user = await User.findById(id);

    if(!user) return res.status(400).json({message:"User not found!",success:false});
    req.user = user;
    next();
};
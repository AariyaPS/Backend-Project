import { User } from '../Models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//bcrypt is being used for hashing passwords before storing them in the database
//Using jsonwebtoken for generating tokens for authentication and authorization


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please enter all the fields" });
    }

    let user = await User.findOne({ email });
    if (user)
        return res.status(400).json({ message: "User already exists with this email", success: false });

    //Using bcrypt for hashing the password
    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashPassword });

    // console.log("User Created Successfully:", req.body);
    res.json({ message: "User Created Successfully:", success: true, user });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all the fields", success: false });
    }

    const user = await User.findOne({ email });

    if (!user)
        return res.json({ message: "User not found with this email", success: false });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.json({ message: "Invalid Password", success: false });

    const token = jwt.sign({ userId: user._id }, process.env.JWT, { expiresIn: '1d' });

    res.json({ message: `Welcome ${user.name}`, token, success: true, user });
};
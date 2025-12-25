import express from 'express';
import { register,login } from '../Controllers/user.js';

const router = express.Router();

//register
//@api desc: user-registration
//@api method: POST
//@api endpoint:- /api/user/register
router.post('/register',register)

//login
//@api desc: user-login
//@api method: POST
//@api endpoint:- /api/user/login
router.post('/login',login)

export default router;
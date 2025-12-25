import express from 'express';
import {addToCart, clearCart, decreaseProductQty, removeProductFromCart, userCart} from '../Controllers/cart.js';
import {isAuthenticated} from '../Middlewares/Auth.js';


const router = express.Router();

router.post('/add',isAuthenticated, addToCart);

//get user cart
router.get('/user', isAuthenticated, userCart);

//remove product from cart
router.delete('/remove/:productId', isAuthenticated, removeProductFromCart);

//clear Cart
router.delete('/clear', isAuthenticated, clearCart)

//decrease qty
router.post('/--qty', isAuthenticated, decreaseProductQty)

export default router;
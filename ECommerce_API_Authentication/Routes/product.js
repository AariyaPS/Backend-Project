import express from 'express';
import { addProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from '../Controllers/product.js';

const router = express.Router();

//add a product
//@api desc: add-product
//@api method: POST
//@api endpoint:- /api/product/add
router.post('/add',addProduct)

//get all product
//@api desc: get all product
//@api method: GET
//@api endpoint:- /api/product/all
router.get('/all',getAllProducts)

//get product by id
//@api desc: get product by id
//@api method: GET
//@api endpoint:- /api/product/:id
router.get('/:id',getProductById)

//update product by id
//@api desc: update product by id
//@api method: PUT
//@api endpoint:- /api/product/:id
router.put('/:id',updateProductById)

//delete product by id
//@api desc: delete product by id
//@api method: DELETE
//@api endpoint:- /api/product/:id
router.delete('/:id',deleteProductById)

export default router;
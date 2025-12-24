import express from 'express';
import { newContact,getAllContact, getContactById, updateContactById, deleteContactById, getContactByUserId } from '../Controllers/contact.js';
import { isAuthenticated } from '../Middlewares/Auth.js';

const router = express.Router();

//Contact Routes
//@api desc: Creating new contact
//@api method: POST
//@api endpoint: /api/contact/new
router.post('/new', isAuthenticated, newContact);

//Contact Routes
//@api desc: Get all contacts
//@api method: GET
//@api endpoint: /api/contact/
router.get('/', getAllContact);

//Contact Routes
//@api desc: Get contact by ID
//@api method: GET
//@api endpoint: /api/contact/
router.get('/:id', getContactById);

//Contact Routes
//@api desc: Update contact by ID
//@api method: PUT
//@api endpoint: /api/contact/
router.put('/:id', isAuthenticated, updateContactById);

//Contact Routes
//@api desc: Delete contact by ID
//@api method: DELETE
//@api endpoint: /api/contact/
router.delete('/:id', isAuthenticated, deleteContactById);

//Contact Routes
//@api desc: Get contact by User ID
//@api method: GET
//@api endpoint: /api/contact/
router.get('/userid/:id', isAuthenticated, getContactByUserId);

export default router;
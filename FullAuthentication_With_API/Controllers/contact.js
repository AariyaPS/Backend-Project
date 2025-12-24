import {Contact} from '../Models/contact.js';


//Get all contacts
export const getAllContact = async(req,res)=>{
    const userContact = await Contact.find();

    if(!userContact) return res.status(404).json({message: "No contacts found"});

    res.json({message: "Contacts fetched successfully", success:true, contacts: userContact});
}

//Create new contact
export const newContact = async (req, res) => {
    const {name, email, phone, type} = req.body;

    if(!name || !email || !phone || !type){
        return res.status(400).json({message: "All fields are required"});
    }

    let savedContact = await Contact.create({name, email,phone,type, user: req.user});
    res.json({message: "Contact created successfully", success: true,contact: savedContact});
};

//Get contact by ID
export const getContactById = async (req,res) => {
    const id = req.params.id;
    const userContact = await Contact.findById(id);
    if(!userContact) return res.status(404).json({message: "Contact not found", success:false});
    res.json({message: "Contact fetched successfully", success:true, success:true,contact: userContact});
}

//Update by ID
export const updateContactById = async(req,res)=>{
    const id = req.params.id;
    const {name,email,phone,type} = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(id,{name,email,phone,type},{new:true});
    if(!updatedContact) return res.status(404).json({message: "Contact not found", success:false});

    res.json({message: "Contact updated successfully", success:true, contact: updatedContact});
}

//Delete by ID
export const deleteContactById = async(req,res)=>{
    const id = req.params.id;
    const deleteContact = await Contact.findByIdAndDelete(id);
    if(!deleteContact) return res.status(404).json({message: "Contact not found", success:false});
    res.json({message: "Contact deleted successfully", success:true});
}

//Get user by user id
export const getContactByUserId = async (req,res) => {
    const id = req.params.id;
    const userContact = await Contact.find({user:id});
    if(!userContact) return res.status(404).json({message: "Contact not found", success:false});
    res.json({message: "User Specific Contact fetched successfully", success:true, success:true,contact: userContact});
}
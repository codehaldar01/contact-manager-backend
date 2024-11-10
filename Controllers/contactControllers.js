const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
//@desc GET contacts
//@route GET api/contacts
//@access Private

const getContact = asyncHandler( async(req,res)=>{
    const contact = await Contact.find({user_id: req.user.id});
    res.status(200).json(contact)
});

//@desc create contacts
//@route POST api/contacts
//@access Private

const createContact = asyncHandler( async (req,res)=>{
    console.log(req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        console.log("it is coming here")
        res.status(400)
        throw new Error("These fields are mandatory")
    };
    const contact = await Contact.create({
        user_id: req.user.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })
    res.status(201).json(contact);
});
//@desc get contact by id
//@route GET api/contacts/id
//@access Private

const getContactById = asyncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Not found the id")
    }
    res.status(200).json(contact)
});
//@desc update contacts
//@route PUT api/contacts
//@access Private

const updateContact = asyncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Not found the id")
    }
    const updatedcontact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedcontact)
})
//@desc create contacts
//@route POST api/contacts
//@access Private

const deleteContact = asyncHandler( async(req,res)=>{
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Not found the id")
    }
    //await contact.remove();
    res.status(200).json(contact)
});



module.exports={getContact,createContact,getContactById,updateContact,deleteContact};
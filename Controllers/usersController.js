const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Subham = require('../models/subhamModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//@desc POST 
//@route POST api/users/register
//@access public

const userRegister = asyncHandler( async(req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All the fields are mandatory");
    }
    const userMailExists = await User.findOne({email});
    const usernameExists = await User.findOne({username});
    if(userMailExists){
        res.status(400);
        throw new Error("This email is already begin used");
    }
    if(usernameExists){
        res.status(400);
        throw new Error("This username is already being used");
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    console.log(`user has been created ${user}`);
    if(user){
        res.status(201).json({id: user.id, email: user.email})
    }
    else{
        res.status(400)
        throw new Error("user data isn't valid")
    }
    //res.status(201).json({message: "User has been registered successfully"})
});


//@desc POST 
//@route POST api/users/login
//@access public

const userLogin = asyncHandler( async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error(" Input Data Isn't Valid");
    }
    const user = await User.findOne({email});
    if(user && await bcrypt.compare(password,user.password)){
        const accessToken=jwt.sign(
            {
               user:{
                username: user.username,
                email: user.email,
                id: user.id
               }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "30m"}
        )
        res.status(200).json({accessToken})
    }
    else{
        res.status(401);
        throw new Error("Email or Password is not valid")
    }
    
});


//@desc GET 
//@route GET api/users/currentUser
//@access private

const currentUser = asyncHandler( async(req,res)=>{
    res.json(req.user)
});

module.exports = {userLogin, userRegister, currentUser}
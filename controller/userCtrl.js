const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../Config/jwtToken');

// create a user
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email});
    
    if(!findUser){
        // create a new user
        const newUser = await User.create(req.body)
        res.json(newUser)
    }
    else {
        // user already exist
        throw new Error["User Already Exist"];
    }
});

//login a user
const loginUserCtrl = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    //check if the user exist or not
    const findUser = await User.findOne({ email });
    if(findUser && await findUser.isPasswordMatched(password)){
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        })
    } else {
        throw new Error("Invalid credencials")
    }
})

// get all users
const getallUser = asyncHandler(async(req, res) => {
    try {
        const getUsers = await User.find()
        res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})

// get a single user
const getaUser = asyncHandler(async(req, res) => {
    console.log(req.params)
    const { id } = req.params
    try {
        const getaUser = await User.findById(id)
        res.json({
            getaUser
        })
    } catch (error) {
        throw new Error(error)
    }
})

// delete a single user
const deleteaUser = asyncHandler(async(req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
        const deleteaUser = await User.findByIdAndDelete(id)
        res.json({
            deleteaUser
        })
    } catch (error) {
        throw new Error(error)
    }
})

// Update a user
const updateaUser = asyncHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const updateaUser = await User.findByIdAndUpdate(id, {
            firstname: req?.body.firstname,
            lastname: req?.body.lastname,
            email: req?.body.email,
            mobile: req?.body.mobile
        },
        {
            new: true,
        });
        res.json(updateaUser)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updateaUser };
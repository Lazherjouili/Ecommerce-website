const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
    register: async (req, res) => {
        try {
            const userFromDb = await User.findOne({ email: req.body.email });
            if (userFromDb) {
                return res.status(400).json({ email: { message: "Email Already Exist. Try to Login." } })
            }
            const user = await User.create(req.body);
            const userToken  =  jwt.sign({id:user._id}, process.env.jwt)
            res.status(201).cookie('userToken', userToken).json({'token':userToken});
            // res.status(201).json(user);
        } catch (error) {
            res.status(400).json(error.errors)
        }
    },
    login: async (req, res) => {
        const userFromDb = await User.findOne({ email: req.body.email })
        if (!userFromDb) {
            return res.status(400).json({ email: { message: "Email doesn't exist." } })
        } else {
            try {
                const compareResult = await bcrypt.compare(req.body.password, userFromDb.password);
                if(!compareResult){
                    return res.status(400).json({ email: { message: "Wrong password ." } })
                } else{
                    const userToken  = jwt.sign({id:userFromDb._id}, process.env.jwt)
                    return res.status(200).cookie('userToken', userToken).json({'token':userToken})
                }
            } catch (error) {
                res.status(400).json(error)
            }
        }
    },
    logout : async (req,res) => {
        const {userToken} = req.cookies
        if(!userToken){
            return res.status(400).json({message:'Token not found.'})
        }
        try {
            res.clearCookie('userToken');
            res.status(204).json({message:"User Logged out successfully."})
        } catch (error) {
            res.status(400).json(error)
        }
    },
    getLoggedUser : async (req,res) => {
        const {userToken} = req.cookies
        if(!userToken){
            return res.status(400).json({message:'Token not found.'})
        }
        try {
            const token = jwt.verify(userToken, process.env.jwt)
            console.log('==========> TOKEN : ', token);
            const loggedUser  =  await User.findById(token.id).select('-password -createdAt')
            return res.status(200).cookie('userToken', userToken)
            .json({ token: userToken, loggedUser });

        } catch (error) {
            res.status(400).json(error)
        }
    },
    getLoggedUserWithpProducts : async (req,res) => {
        const {userToken} = req.cookies
        if(!userToken){
            return res.status(400).json({message:'Token not found.'})
        }
        try {
            const token = jwt.verify(userToken, process.env.jwt)
            console.log('TOKEN : ', token);
            const loggedUser  =  await User.findById(token.id).select('-password -createdAt').populate('notes')
            return res.status(200).json(loggedUser)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    deleteOneUser:(req,res) =>{
        console.log("Inside Delete", req.params.id);
        User.findByIdAndDelete({_id:req.params.id})
        .then(deletedUser=> {

            res.status(200).json({data:deletedUser, message:'User deleted With Success', ok: true})
        }  )
        .catch(error =>{
            console.log(error);
            res.status(500).json({error})
        })},
    registerAdmin : (req,res) => {
        const userData = {...req.body, role:'admin'}
        User.create(userData)
        .then(response => res.status(201).json({response}))
        .catch(error => res.status(400).json(error))
    },
    findAllUsers : (req, res) => {
        User.find()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json(err);
        });
    }
}





    // register : (req,res) => {
    //     User.create(req.body)
    //     .then(response => res.status(201).json({response}))
    //     .catch(error => res.status(400).json(error))
    // },

  
    // ! Seeding data
    // login : (req,res) => {
    //     //  1 -  search user by email 
    //     //  -If user exist = > compare password with hashed password
    //     User.findOne({email:req.body.email}).then(response => res.status(200).json(response))
    //     .catch(error => res.status(400).json(error))
    //     // ! if user not found INVALID  EMAIL/ Password
    // }
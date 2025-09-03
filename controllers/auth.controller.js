import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signupController = async (req,res,next) => {
    const { userName, email, password } = req.body;
    // Here, you would typically add logic to handle user registration,
    // such as saving the user to a database and hashing the password.
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser= new User({userName,email,password:hashedPassword});
    try{
        await newUser.save()
        res.status(201).json({ message: "User registered successfully" });
    }catch(err){
        next(err);
    }
}

export const signinController = async (req,res,next) => {
    const {email,password}= req.body;
    try {
        const validUser = await User.findOne({email:email});
        if (!validUser) {
            return next(errorHandler(404,"User not found"));
        }
        const validPassword = await bcrypt.compare(password,validUser.password);
        if (!validPassword) {
            return next(errorHandler(400,"Invalid password"));
        }
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const {password:_, ...otherdetails} = validUser._doc;
        res.cookie("access_token",token,{httpOnly:true, expires:new Date(Date.now()+1000*60*60*24*7)}).status(200).json(otherdetails)
    } catch (err) {
        next(err); 
    }
}
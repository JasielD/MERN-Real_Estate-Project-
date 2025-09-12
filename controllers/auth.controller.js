import User from "../models/user.model.js";
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

export const googleController = async (req, res, next) => {
    
    try {
        const validUser = await User.findOne({email:req.body.email});
        //if user already exists
        if(validUser){
            const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
            const {password:_, ...otherdetails} = validUser._doc;
            res
            .cookie("access_token",token,{httpOnly:true, expires:new Date(Date.now()+1000*60*60*24*7)})
            .status(200)
            .json(otherdetails)
        }else{
            //if user does not exist, create new user
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                userName: req.body.userName.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            })
            await newUser.save();
            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password:_, ...otherdetails} = newUser._doc;
            res
            .cookie("access_token",token,{httpOnly:true, expires:new Date(Date.now()+1000*60*60*24*7)})
            .status(200)
            .json(otherdetails)
        }
    } catch (err) {
        next(err);
    }
}

export const handleUploadedImage = async (req, res, next) => {
    try {
        const { userId } = req.body;
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    

    //  const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const avatarUrl = req.file.path; // Cloudinary URL

    // update user in DB
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl },
      { new: true } // return updated user
    );

    res.json({ success: true, avatarUrl: user.avatar });
    } catch (err) {
        next(err);
    }
}

export const signOutController = async (req, res,next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json({message:"User signed out successfully"});
    } catch (err) {
        next(err)
    }
}
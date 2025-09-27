import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import User from "../Models/user.model.js";
import Listing from "../Models/listing.model.js";

export const test = (req, res) => {
    res.json({ message: "User route is working!!!" });
}

export const updateUser = async(req,res,next)=>{
    if (req.user.id !== req.params.id) return next(errorHandler(401,"You can update only your account"));
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                userName:req.body.userName,
                email:req.body.email,
                password:req.body.password,
            }
        },{new:true});
         if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

        const {password, ...otherdetails} = updatedUser._doc;
        res.status(200).json(otherdetails);
        
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async(req,res,next)=>{
   if (req.user.id !== req.params.id) return next(errorHandler(401,"You can delete only your account"));
   try {
     await User.findByIdAndDelete(req.params.id);
     res.clearCookie("access_token");
        res.status(200).json({message:"User deleted successfully"})
   } catch (err) {
    next(err);
   }
}

export const getUserListings = async (req,res,next)=>{
    if(req.user.id === req.params.id){
    try {
            const listings = await Listing.find({userRef:req.params.id});
            res.status(200).json(listings);
            
        } catch (err) {
            next(err)
        }
    }else{
        return next(errorHandler(401,"You can only view your own listings"))
    } 
    
}

export const getUserController = async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user) return next(errorHandler(404,"User not found!!"))
        const {password,...otherdetails}=user._doc
        res.status(200).json(otherdetails)
    } catch (err) {
        next(err)
    }
}

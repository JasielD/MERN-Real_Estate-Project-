import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

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
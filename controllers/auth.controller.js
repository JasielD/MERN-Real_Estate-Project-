import User from "../Models/user.model.js";
import bcrypt from "bcrypt";

export const authController = async (req,res,next) => {
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

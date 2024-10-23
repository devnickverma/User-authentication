import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
       const {email, password, name} = req.body;

       try{
         if(!email || !password || !name){
            return new Error("All fields are required");
         }

         const userAlreadyExists = await User.findOne({email});

         if(userAlreadyExists){
            return res.status(400).json({success: false, message: "User already exists"});
         }

         const hashedPassword = await bcryptjs.hash(password, 10);
         const verificationToken = Math.floor(Math.random() * 900000).toString();
         const user = new User({
            email, 
            password: hashedPassword, 
            name,
            verificationToken,
            verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000
        })

        await user.save(); // Continue from here


       }catch(error){
        return res.status(400).json({success: false, message: error.message});
       }
};
export const login = async (req, res) => {
    res.send("Login route");
};
export const logout = async (req, res) => {
    res.send("Logout route");
};


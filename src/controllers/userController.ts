import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerSchema, updateSchema } from "../validation/user-schema";
import dotenv from 'dotenv';
dotenv.config();

export const registerUser = async (req: Request, res:Response) => {
    const { email, password } = req.body;
      const { error } = registerSchema.validate(req.body);
  if (error) {
      return res.status(400).json({ message: error.details[0].message });
  }

 const existingUser = await User.findOne({ email });
  if (existingUser) {
  return res.status(400).json({ message: "The user already exists" });
}
      console.log('Request body:', req.body); 
    try {
        const hashedPassword = await bcrypt.hash( password, 10);
        const user = new User({...req.body, password:hashedPassword})
        console.log("User Detail: "+user)
        await user.save();
        res.status(201).json({ message: 'User registered' });
    }
    catch  (error) {
         if (error instanceof Error) {
    res.status(500).json({ error: error.message })
}
 else {
    res.status(500).json({ error: 'An unknown error occurred' });
  }
  }
}
export const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ message: 'User not found' })
        }
        const match = await bcrypt.compare(password, user.password);
        if( !match ) return res.status(400).json({ message: 'Invalid password' })
        const token = jwt.sign({ _id: user._id, email:email }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' })
        res.status(200).json({ token });
    } catch (error) {
        if (error instanceof Error)
        res.status(500).json({ error: error.message })
    }
   
}

export const getAllUsers= async (req: Request, res: Response) => {
    try{
if(!req.user?.isAdmin || !req.user)
 return res.status(403).json({ message: 'Access denied. Admins only.' });

 const users = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
export const getUserBYId= async (req: Request, res: Response) => {
    try{
          const userId= req.params.id;
  if(req.user?.id !== userId && !req.user?.isAdmin){
    return res.status(500).json({ message: "No access"})
  }
  
   res.status(200).json(req.user)
    }
catch{
     res.status(500).json({ message: "Some Error" })
}
} 

export const editUser= async (req:Request, res: Response) => {
const userId= req.params.id;
console.log(userId)
   const { error } = updateSchema.validate(req.body);
  if (error) {
      return res.status(400).json({ message: error.details[0].message });
  }
try{
    const updateUser= await User.findByIdAndUpdate(userId, req.body, {new: true});
    if(updateUser) {
        res.status(200).json({message: "The user updated: " + updateUser})
    }
    else{
        res.status(404).json({ message: "Not found"})
    }
}
catch(error){
    res.status(500).json({message: "Some error: " + error })
}
}

export const changeIsBusinessStatus = async (req:Request, res:Response) => {
    const userId= req.params.id;
    console.log(userId)
    if(!req.user) return res.status(404).json({ message: "User no found" })
    try{
    const updateUser= await User.findByIdAndUpdate(userId, {isBusiness: !req.user.isBusiness},{new: true});
    if(updateUser) {
        res.status(200).json({message: " The user business status: " + updateUser.isBusiness})
    }
    else{
        res.status(404).json({ message: "Not found"})
    }
}
catch(error){
    res.status(500).json({message: "Some error: " + error })
}
}
export const deleteUser = async (req: Request, res:Response) => {
    const userId= req.params.id;
    console.log(userId)
    if(!req.user) return res.status(404).json({ message: "User no found" })
    try{
    const updateUser= await User.findByIdAndDelete(userId, {new: true});
    if(updateUser) {
        res.status(200).json({message: "The user has been deleted: " + updateUser.isBusiness})
    }
    else{
        res.status(404).json({ message: "Not found"})
    }
}
catch(error){
    res.status(500).json({message: "Some error: " + error })
}
}

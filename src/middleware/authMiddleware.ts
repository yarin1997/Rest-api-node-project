import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface TokenPayload {
  _id: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as TokenPayload;
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    req.user = user;
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export const authGetUserById = async (req:Request, res:Response, next:NextFunction) => {
const token= req.header('Authorization');
if (!token) return res.status(401).json({ message: 'No token provided' });
 try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as TokenPayload;
    const user = await User.findById (decoded._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    req.user = user;
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export const authUpdating = async (req:Request, res:Response, next:NextFunction) => {
  const token = req.header('Authorization');
  console.log("TOKEN:" + token)
  if (!token) return res.status(401).json({ message: 'No token provided' });

   try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as TokenPayload;
    const user = await User.findById (decoded._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if(decoded._id !== req.params.id.toString()) {
      return res.status(403).json("You dont have auth to update this user")
    }
    req.user = user; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
export const authDeleting = async (req:Request, res:Response, next:NextFunction) => {
  const token = req.header('Authorization');
  console.log("TOKEN:" + token)
  if (!token) return res.status(401).json({ message: 'No token provided' });
   try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as TokenPayload;
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if(decoded._id !== req.params.id  && !user.isAdmin)
    {
      return res.status(403).json("You dont have auth to delete this user");
    }
    req.user = user; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
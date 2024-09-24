import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface TokenPayload {
  _id: string;
}

export const authCreate= async (req: Request, res: Response, next: NextFunction) => {
    const token= req.header('Authorization');
      if (!token) return res.status(401).json({ message: 'No token provided' });
        
    try{
        const decoded =jwt.verify(token,  process.env.JWT_SECRET || 'default_secret') as TokenPayload;
        const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if(!user.isBusiness) return res.status(403).json({ message: 'only Business user auth to post card'});
    req.user = user; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export const authGetAllCards= async (req: Request, res: Response, next: NextFunction) => {
  const token= req.header('Authorization');
  if(!token) return res.status(401).json({ message: 'No token provided' });
      try{
        const decoded =jwt.verify(token,  process.env.JWT_SECRET || 'default_secret') as TokenPayload;
        const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
export const authGetCardById = async (req: Request, res:Response, next: NextFunction) => {
  const token= req.header('Authorization');
  if(!token) return res.status(401).json({ message: 'No token provided' });
  try{
        const decoded =jwt.verify(token,  process.env.JWT_SECRET || 'default_secret') as TokenPayload;
        const user = await User.findById(decoded._id);
       if (!user) return res.status(404).json({ message: 'User not found' });
         next(); 
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export const authGetMyCards = async (req: Request, res:Response, next: NextFunction) => {
  const token= req.header('Authorization');
  if( !token ) return res.status(401).json({ message: 'No token provided' });
  try{
        const decoded =jwt.verify(token,  process.env.JWT_SECRET || 'default_secret') as TokenPayload;
        const user = await User.findById(decoded._id);
       if (!user) return res.status(404).json({ message: 'User not found' });
       req.user= user
         next(); 
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export const authEditCard = async (req:Request, res:Response, next: NextFunction) => {
  const token= req.header('Authorization');
   if( !token ) return res.status(401).json({ message: 'No token provided' });
  try{
        const decoded =jwt.verify(token,  process.env.JWT_SECRET || 'default_secret') as TokenPayload;
        const user = await User.findById(decoded._id);
       if (!user) return res.status(404).json({ message: 'User not found' });
       req.user= user
         next(); 
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export const authDeleteCard = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
   if( !token ) return res.status(401).json({ message: 'No token provided' });
  try{
        const decoded =jwt.verify(token,  process.env.JWT_SECRET || 'default_secret') as TokenPayload;
        const user = await User.findById(decoded._id);
       if (!user) return res.status(404).json({ message: 'User not found' });
       req.user= user
         next(); 
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
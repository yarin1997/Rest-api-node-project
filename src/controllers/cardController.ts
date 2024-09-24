import { Request, Response } from "express";
import { cardSchema, cardSchemaUpdate } from "../validation/card-schema";
import dotenv from 'dotenv';
import Card from "../models/Card";
import { ObjectId } from "mongoose";
dotenv.config();



export const createNewCard= async (req: Request, res: Response) => {
    console.log(req.body);
    const {error} = cardSchema.validate( req.body );
    if ( error ) return res.status(400).json({ message: `Validation error: ${error.details[0].message}` });

    const newCard= {...req.body, user_id: req.user?._id}
    try{
        const card= new Card(newCard);
        await card.save();
        res.status(201).json({ message: 'Card created' });
    }
      catch  (error) {
         if (error instanceof Error) {
    res.status(500).json({ error: error.message });
}
 else {
    res.status(500).json({ error: 'An unknown error occurred' });
  }
  }
}

export const getAllCards = async (req:Request, res: Response) => {
try{
  const cards= await Card.find();
 return res.status(200).json({
  message: "The user list:",
  cards: JSON.stringify(cards, null, 2) 
})
} catch {
  return res.status(500).json({ message: " Some issue cause your request failure"})
}
}
export const getCardById = async (req:Request, res:Response)=>{
  const cardId= req.params.id;
  console.log(cardId)
  try{
    const card= await Card.findById(cardId);
    if ( !card ) return res.status(401).json({ message: `The card dosen't exist by the given ID`})
      return res.status(200).json({ message: `The card: ${card}`})
  }
  catch{
    return res.status(500).json({ message: "Some issue"})
  }
}

export const getMyCards = async (req: Request, res:Response) => {
  const userId= req.user?._id
  if(!userId) return res.status(401).json({ message: "The id hasn't found"})
    try{
   const myCard = await Card.find( {user_id:userId });
   if (myCard.length === 0) {
    return res.status(404).json({ message: "No cards found for the given user ID." });
  }
  return res.status(200).json({
    message: "Cards found for the given user ID.",
    cards: myCard
  });
    }
    catch (error) {
       return res.status(500).json({
    message: "An error occurred while retrieving the cards."
  });
    }
}

export const editCard= async (req:Request, res: Response) => {
  const {error}= cardSchemaUpdate.validate(req.body)
  if (error) return res.status(400).json({ messsage: "The cahnges are not valid"})
  const cardId= req.params.id;

  try {
    const card= await Card.findById(cardId);
    if( !card ) return res.status(401).json({ message: "The card isn't exist"})
    const cardUserId= card.user_id;
    if (cardUserId.toString().trim() !== (req.user?._id as string).toString().trim() ) return res.status(401).json({ message: "You cant edit card that belong to another users"});

    const updateCard= await Card.findByIdAndUpdate(cardId, req.body, { new:true })
    console.log( updateCard)
    if ( updateCard ) return res.status(200).json({ message: "the card is updated successfuly", card: updateCard})
  }
  catch (error) {
     res.status(500).json({message: "Some error: " + error })
  }
}

export const likeCard = async (req:Request, res:Response) => {
  const cardId= req.params.id;
  try{
    const card= await Card.findById(cardId);
    if (!card) return res.status(400).json({message: "card isn't exist"})
    const likesArray = card.likes;
    const userId = req.user?._id;
     if (likesArray.includes(userId as ObjectId)) {
      card.likes = likesArray.filter(id => id.toString().trim() !== (userId as string).toString().trim());
    } else {
        card.likes.push(userId as ObjectId);
    }
      await Card.findByIdAndUpdate(cardId, {likes: card.likes}, {new:true})
      return res.status(200).json({ message: "the arrayLikes updated successfuly", likes: card.likes})
    }
    catch (error) {
      return res.status(500).json({ message: "Some error"})
    }
}

export const deleteCard = async (req: Request, res: Response) =>{
const cardId = req.params.id;
try{
    const card = await Card.findById(cardId);
    if (!card) return res.status(400).json({message: "card isn't exist"})
      const cardCreatorId = card.user_id;
    if ( (cardCreatorId.toString().trim() !== (req.user?._id as string).toString().trim())  && !req.user?.isAdmin) {
      return res.status(401).json({ message: " You havn't the auth to delete"})
    }
    else {
      await Card.findByIdAndDelete(cardId);
      return res.status(200).json({ message: "Deleted successfully : ", card})
    }
} catch (error) {
  return res.status(500).json({ message: "Some Error: "+ error})
} 
}
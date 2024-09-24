// import  Card  from "../models/Card"; 
// import  User from "../models/User";
// import { initialData } from './initial-data'; 
// import bcrypt from 'bcryptjs';

// export const createInitialData = async () => {
//   // בודק אם כבר קיימים 3 משתמשים וכרטיסים
//   const usersCount = await User.countDocuments();
//   const cardsCount = await Card.countDocuments();
//     let users = [] 
//   while (usersCount < 3) {
//     // יצירת משתמשים
//     let users = initialData.users[usersCount]
     
//   }
    
//     const createdUsers = await User.insertMany(users);

//     // יצירת כרטיסי ביקור
//     const cards = initialData.cards.map((card, index) => ({
//       ...card,
//       user_id: createdUsers[index]._id, // מקשר את הכרטיס למשתמש המתאים
//     }));

//     await Card.insertMany(cards);
//   }

//   // החזרת המשתמשים והכרטיסים מהדאטהבייס
//   const users = await User.find();
//   const cards = await Card.find().populate('user_id');

//   return { users, cards };
// };
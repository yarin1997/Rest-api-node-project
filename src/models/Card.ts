import mongoose, {Document, ObjectId, Schema} from "mongoose";

const generateBizNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export interface ICard extends Document {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image?: {
    url: string;
    alt: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    zip: string;
  };
  likes: ObjectId[];
  user_id: ObjectId;
}

export const addressSchema= new Schema ({
        state: {type: String, required:true},
        country: {type: String, required:true},
        city: {type: String, required:true},
        street: {type: String, required:true},
        houseNumber: {type: String, required:true},
        zip: {type: String, required:true},
})
export const imageSchema= new Schema ({
    url: { type:String, required: true},
    alt: { type:String, required: true}
})

export const cardSchema = new Schema ({
    title: {type: String, required:true},
    subtitle: {type: String, required:true},
    description: {type: String, required:true},
    phone: {type: String, required:true},
    email: {type: String, required:true},
    web: {type: String, required:true},
    image: {type: imageSchema, required: false},
    address: {type: addressSchema, required:true},
    likes: {
    type: [Schema.Types.ObjectId],
    default: []
  },   user_id: {
    type: Schema.Types.ObjectId,
    required: true, 
    ref: "User", 
  }, bizNumber: {
      type: Number,
      default: generateBizNumber, 
      unique: true, 
    }
}, {
  timestamps: true,
});

export default mongoose.model<ICard>('Cards', cardSchema);

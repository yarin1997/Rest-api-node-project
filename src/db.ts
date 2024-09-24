import mongoose from 'mongoose';

const connectDB = async () => {
 try {
      console.log('MONGODB_URI:', process.env.MONGODB_URI);

    const uri: string = process.env.ENV_MODE == "develop"
      ? process.env.MONGODB_URI! || 'mongodb://localhost:27017/myapp-db'
      : process.env.MONGO_ATLAS || '';
    if (!uri) {
      throw new Error('MongoDB connection string is not defined.');
    }
    await mongoose.connect(uri);
    console.log('MongoDB connected');

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;

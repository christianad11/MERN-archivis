import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables directly
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

export { connectDB };
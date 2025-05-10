import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB Connected: ${conn.connection.host}`);
    }
    catch(err){
        console.error(`Error connecting to MongoDB: ${err}`);
        process.exit(1); // 0 means success, 1 means failure
    }
}

export default connectDB;
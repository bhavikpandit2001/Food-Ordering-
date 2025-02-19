import mongoose from "mongoose";
const {DB} = process.env // Ensure you have a config file or define the connection string here

const connectDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process if connection fails
    }
};

export default connectDB;

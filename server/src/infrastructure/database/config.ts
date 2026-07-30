import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()


const mongoUri: string | undefined = process.env.MONGODB_CONNECTION_STRING

const connectDB = async () => {
    try {
        if (mongoUri)
        await mongoose.connect(mongoUri)
    } catch (error: any) {
        throw new Error("Error Connecting to Database", error?.message)
    }
}

export default connectDB

import mongoose from "mongoose";

const connectDB = async () =>{
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected at: ", connection.connection.host);
}

export default connectDB
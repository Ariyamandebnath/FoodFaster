import mongoose from "mongoose";
import { DB_NAME } from "../constants";
// this will be the wrapper where mongoDB would be connected ! 

const connectDB = async (): Promise<void> => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MongoDB_URI}/${DB_NAME}`);
        
        console.log(`\n MongoDB connected! Db host:${connectionInstance.connection.host}\n`)
        
    } catch (error) {
        console.error(`MongoDb Connection Error`)
        process.exit(1);
    }

}

export default connectDB;
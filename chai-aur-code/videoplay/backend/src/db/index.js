import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n***** Mongodb Connected...!! DB HOST: ${connectionInstance.connection.host} *****`
    );
  } catch (error) {
    console.log("ERROR: Failed to connect to database", error);
    process.exit(1); // this process comes from express
  }
};

export default connectDB;

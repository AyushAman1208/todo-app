import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const conntectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      "Mongodb connection successfull at",
      conntectionInstance.connection.host
    );
  } catch (error) {
    console.log("Error in connecting database", error);
    process.exit(1);
  }
};

import mongoose from "mongoose";
import { DB_USER,DB_PASS,DB_HOST,DB_NAME} from './config.js'

export const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);
    console.log(">>> DB is connected");
  } catch (err) {
    console.log(err);
  }
};

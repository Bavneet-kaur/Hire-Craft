import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("DB Connected");
  } catch (err) {
    console.log("If not connected to DB, error:", err);
    process.exit(1);
  }
};

export default connectDB;
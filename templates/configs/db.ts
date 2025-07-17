import mongoose from "mongoose";

export const connectToDB = async (uri: string) => {
  try {
    console.log("connecting to database....")
    await mongoose.connect(uri);
    console.log("🟢 Successfuly Connected to MongoDB");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

export default connectToDB
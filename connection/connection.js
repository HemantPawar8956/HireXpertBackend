import mongoose from "mongoose";

export const DBConnection = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
export const DBDisconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log("Database disconnected successfully");
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
  }
};

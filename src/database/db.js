import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connection to MongoDB is established");
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
}

export default dbConnection;
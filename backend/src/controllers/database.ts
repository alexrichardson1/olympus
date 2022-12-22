import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connect = async (): Promise<void> => {
  await mongoose.connect(process.env.DB_URI || "").catch((err) => console.error(err));
};

const close = async (): Promise<void> => {
  await mongoose.connection.close();
};

// const drop = async (): Promise<void> => {
//   await mongoose.connection.dropDatabase();
// }

const mongoDB = {
  connect: connect,
  close: close,
};

export default mongoDB;

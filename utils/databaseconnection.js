import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

const databaseconnection = async () => {
  await mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
      console.log("your database connection is succesfully ");
    })
    .catch((error) => {
      console.log(error);
    });
};
export default databaseconnection;

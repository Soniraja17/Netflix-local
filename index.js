import express from "express";
import dotenv from "dotenv";
import databaseconnection from "./utils/databaseconnection.js";
import cookieParser from "cookie-parser";
import userroute from "./routes/route.js";
import cors from "cors";
dotenv.config({
  path: ".env",
});

databaseconnection();
const app = express();
const corsoption = {
  origin: "http://localhost:3000",
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  credentials: true,
};

app.use("*", cors(corsoption));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userroute);

app.listen(process.env.PORT, () => {
  console.log(`server connected at `);
});

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // to accept json data

app.use("/api/auth", authRoutes);

app.listen(port, () => {
    connectDB();
    console.log("Server is running on port : ", port);
}); 

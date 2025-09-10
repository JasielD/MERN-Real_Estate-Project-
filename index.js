import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './Routes/user.route.js';
import AuthRouter from './Routes/auth.route.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("Connected to MongoDB");
}).catch((err)=>{
  console.error("Error connecting to MongoDB:", err);
})

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/user",UserRouter);
app.use("/api/auth",AuthRouter);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err,req,res,next)=>{
  const statusCode = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(statusCode).json({
    success:false,
    status:statusCode,
    message:message,
  });
})
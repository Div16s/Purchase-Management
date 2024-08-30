import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js'
import formRouter from './routes/formsRouter.js'

const app = express();
const PORT = 5000;

//middlewares
app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Backend running fine"
    });
})

//routes
app.use("/users",userRouter);
app.use("/forms",formRouter);

app.listen(PORT,()=>{
    console.log(`Backend is running on port ${PORT}`);
});

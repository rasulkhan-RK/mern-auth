//code module
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import bodyParser from "body-parser";

//local module
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 3001;
connectDB();

const corsOptions = {
  origin: [
    // "http://localhost:5175", // Local dev frontend URL (for local testing)
    "https://mern-auth-frontend-alpha-two.vercel.app/", // Production frontend URL
  ],
  credentials: true, 
  allowedHeaders: "Content-Type, Authorization", 
  methods: "GET, POST, PUT, DELETE, OPTIONS", 
};

app.use(cors({
   origin: 'https://mern-auth-frontend-alpha-two.vercel.app',
  credentials: true,
})); 
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

//API Endpoints
app.get("/", (req, res) => {
  res.send("Api working ");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is Running in PORT:${PORT}`);
});

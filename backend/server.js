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


app.use(cookieParser());
app.use(cors({ origin:"https://mern-auth-front.vercel.app", methods: ["POST", "GET"], credentials: true }));
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

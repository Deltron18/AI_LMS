// import express from "express"
// import dotenv from "dotenv"
// import connectDb from "./configs/db.js"
// import authRouter from "./routes/authRoute.js"
// import cookieParser from "cookie-parser"
// import cors from "cors"
// import userRouter from "./routes/userRoute.js"
// import courseRouter from "./routes/courseRoute.js"
// import paymentRouter from "./routes/paymentRoute.js"
// import aiRouter from "./routes/aiRoute.js"
// import reviewRouter from "./routes/reviewRoute.js"
// dotenv.config()

// let port = process.env.PORT
// let app = express()
// app.use(express.json())
// app.use(cookieParser())
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://ai-lms-frontend-psi.vercel.app"
//   ],
//   credentials: true
// }));
// app.use("/api/auth", authRouter)
// app.use("/api/user", userRouter)
// app.use("/api/course", courseRouter)
// app.use("/api/payment", paymentRouter)
// app.use("/api/ai", aiRouter)
// app.use("/api/review", reviewRouter)

// connectDb()

// app.get("/" , (req,res)=>{
//     res.send("Hello From Server")
// })

// app.listen(port , ()=>{
//     console.log("Server Started")
    
// })

import express from "express";
import dotenv from "dotenv";
import connectDb from "./configs/db.js";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import aiRouter from "./routes/aiRoute.js";
import reviewRouter from "./routes/reviewRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ CORS FIX (manual – guaranteed to work on Render)
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-lms-frontend-psi.vercel.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/ai", aiRouter);
app.use("/api/review", reviewRouter);

// ✅ DB connection
connectDb();

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Hello From Server");
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
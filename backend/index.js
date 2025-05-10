import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// In development, allow requests from the frontend dev server
// In production, no need for CORS as both frontend and backend are served from the same origin
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENTURL || "http://localhost:5173",
      credentials: true,
    })
  );
} else {
  // In production, allow credentials with same-origin
  app.use(cors({ credentials: true }));
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`Port ${PORT} is also active`);
});

// API routes
app.use("/api/auth", authRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on port ${PORT}`);
});

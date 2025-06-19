import express from "express";
import cors from "cors";
import { join } from "path";
import "dotenv/config";
import connectDB from "./config/mongodb.js";

import authRoutes from './routes/auth.routes.js'
import { authenticate } from "./middlewares/auth.middleware.js";


const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api/auth", authRoutes);
app.get("/api/protected", authenticate, (req, res) => {
  res.send(`Hello, user ${req.user.id} with role ${req.user.role}`);
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));

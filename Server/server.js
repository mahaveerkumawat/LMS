import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import { isAdmin } from "./middleware/authMiddleware.js";
import courseRoutes from "./routes/courseRoutes.js";
import lectureRoutes from "./routes/lectureRoutes.js";




dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/lectures", lectureRoutes);

app.get("/", (req, res) => {
    res.send("LMS API is running 🚀");
});

app.get("/api/protected", protect, (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user,
    });
});

app.get("/api/admin", protect, isAdmin, (req, res) => {
    res.json({ message: "Welcome Admin" });
});

app.use("/api/courses", courseRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
import express from "express";
import { addLecture, getLectures } from "../controllers/lectureController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// admin → add lecture
router.post("/", protect, isAdmin, addLecture);

// get lectures by course
router.get("/:courseId", getLectures);

export default router;
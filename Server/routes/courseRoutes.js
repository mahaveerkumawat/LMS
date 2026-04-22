import express from "express";
import { createCourse, deleteCourse, getCourses } from "../controllers/courseController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";


const router = express.Router();

// admin create course
router.post("/", protect, isAdmin, createCourse);

// public get courses
router.get("/", getCourses);

router.delete("/:id", protect, deleteCourse);


export default router;
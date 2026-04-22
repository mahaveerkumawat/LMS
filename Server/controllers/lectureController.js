import Lecture from "../models/Lecture.js";

// ➕ Add Lecture (Admin)
export const addLecture = async (req, res) => {
  try {
    const { title, videoUrl, courseId } = req.body;

    const lecture = await Lecture.create({
      title,
      videoUrl,
      course: courseId,
    });

    res.status(201).json(lecture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📥 Get Lectures by Course
export const getLectures = async (req, res) => {
  try {
    const { courseId } = req.params;

    const lectures = await Lecture.find({ course: courseId });

    res.json(lectures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
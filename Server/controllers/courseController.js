import Course from "../models/Course.js";



// CREATE COURSE (Admin only)
export const createCourse = async (req, res) => {
    try {
        const { title, description, thumbnail } = req.body;

        const existingCourse = await Course.findOne({
            title: { $regex: new RegExp(`^${title}$`, "i") },
        });
        if (existingCourse) {
            return res.status(400).json({
                message: "Course already exists",
            });
        }


        const course = await Course.create({
            title,
            description,
            thumbnail,
            createdBy: req.user._id,
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL COURSES (Public)
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("createdBy", "name email");

        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json({ message: "Course deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

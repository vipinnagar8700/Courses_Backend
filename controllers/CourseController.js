const { generateToken } = require('../config/JwtToken');
const Course = require('../models/coursesModel');
const asyncHandler = require('express-async-handler');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken');
require('dotenv/config')


const AddCourses = asyncHandler(async (req, res) => {
    const { CourseName, languages, price,teachers_id,CourseCategory_id } = req.body;

    // Check if a Course with the given email or phone already exists
    const existingCourse = await Course.findOne({
        $or: [
            { CourseName }
        ]
    });

    if (!existingCourse) {
        // Course does not exist, so create a new Course
        const newCourse = await Course.create(req.body);
        res.status(201).json({
            message: "Course Successfully Created!",
            success: true,
            // data:newCourse
        });
    } else {
        // Course with the same email or phone already exists
        const message = existingCourse.CourseName === CourseName
            ? "CourseName is already exists."
            : "CourseName is already exists.";
        res.status(409).json({
            message,
            success: false
        });
    }
});





const AllCourses = async (req, res) => {
    try {
        const patients = await Course.find(); // Exclude the 'password' field;
        const length = patients.length;
        res.status(200).json([{
            message: "All Courses data retrieved successfully!",
            data: patients,
            status: true,
            length
        }]);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            status: false
        });
    }
};


const editCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const editCourse = await Course.findById(id); // Exclude the 'password' field
        if (!editCourse) {
            res.status(200).json({
                message: "Course was not found!",
            });
        } else {
            res.status(201).json({
                message: "Data successfully Retrieved!",
                success: true,
                data: editCourse
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve Data!",
            status: false
        });
    }
}
const UpdateCourses = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body; // Assuming you send the updated data in the request body

    // Make sure to exclude the 'role' field from the updateData

    try {
        const editCourse = await Course.findByIdAndUpdate(id, updateData, { new: true });

        if (!editCourse) {
            res.status(200).json({
                message: "Course was not found!",
            });
        } else {
            res.status(201).json({
                message: "Data successfully updated!",
                success: true,
                data: editCourse
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to update data!",
            status: false
        });
    }
}






const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const editCourse = await Course.findByIdAndDelete(id); // Exclude the 'password' field
        if (!editCourse) {
            res.status(200).json({
                message: "Course was not found!",
            });
        } else {
            res.status(201).json({
                message: "Data successfully Deleted!",
                success: true,
                
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to Deleted Data!",
            status: false
        });
    }
}

module.exports = {
    AddCourses,
     AllCourses,editCourse,UpdateCourses,deleteCourse
}
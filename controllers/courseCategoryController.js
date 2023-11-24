const { generateToken } = require('../config/JwtToken');
const CourseCategory = require('../models/courseCategoryModel');
const asyncHandler = require('express-async-handler');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken');
require('dotenv/config')

const AddCourseCategorys = asyncHandler(async (req, res) => {
    const {CategoryName } = req.body;

    // Check if a CourseCategory with the given email or phone already exists
    const existingCourseCategory = await CourseCategory.findOne({
        $or: [
            { CategoryName }
        ]
    });

    if (!existingCourseCategory) {
        // CourseCategory does not exist, so create a new CourseCategory
        const newCourseCategory = await CourseCategory.create(req.body);
        res.status(201).json({
            message: "CourseCategory Successfully Created!",
            success: true,
            data:newCourseCategory
        });
    } else {
        // CourseCategory with the same email or phone already exists
        const message = existingCourseCategory.CategoryName === CategoryName
            ? "CategoryName is already exists."
            : "CategoryName is already exists.";
        res.status(409).json({
            message,
            success: false
        });
    }
});


const AllCourseCategorys = async (req, res) => {
    try {
        const patients = await CourseCategory.find(); // Exclude the 'password' field;
        const length = patients.length;
        res.status(200).json([{
            message: "All CourseCategorys data retrieved successfully!",
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


const editCourseCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const editCourseCategory = await CourseCategory.findById(id); // Exclude the 'password' field
        if (!editCourseCategory) {
            res.status(200).json({
                message: "CourseCategory was not found!",
            });
        } else {
            res.status(201).json({
                message: "Data successfully Retrieved!",
                success: true,
                data: editCourseCategory
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve Data!",
            status: false
        });
    }
}




const deleteCourseCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const editCourseCategory = await CourseCategory.findByIdAndDelete(id); // Exclude the 'password' field
        if (!editCourseCategory) {
            res.status(200).json({
                message: "CourseCategory was not found!",
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
    AddCourseCategorys,
     AllCourseCategorys,editCourseCategory,deleteCourseCategory
}
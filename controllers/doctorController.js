const { generateToken } = require('../config/JwtToken');
const { Teacher } = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken');
require('dotenv/config')


const AllTeachers = async (req, res) => {
    try {
        const Teacherss = await Teacher.find().select('-password'); // Exclude the 'password' field;
        const length = Teacherss.length;
        res.status(200).json([{
            message: "All Teacher data retrieved successfully!",
            data: Teacherss,
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

const editTeacher = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const Teacherss = await Teacher.findById(id).select('-password');
        console.log(Teacherss)// Exclude the 'password' field
        if (!Teacherss) {
            res.status(404).json({  // Correct the status code to 404 (Not Found)
                message: "Teacher was not found!",
                success: false,
            });
        } else {
            res.status(200).json({  // Correct the status code to 200 (OK)
                message: "Data successfully Retrieved!",
                success: true,
                data: Teacherss
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve Data!",
            success: false,  // Correct the key to 'success'
        });
    }
}


const UpdateTeacher = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body; // Assuming you send the updated data in the request body

    // Make sure to exclude the 'role' field from the updateData
    delete updateData.role;

    try {
        const editTeacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true }).select('-password');

        if (!editTeacher) {
            res.status(200).json({
                message: "Teacher was not found!",
            });
        } else {
            res.status(201).json({
                message: "Data successfully updated!",
                success: true,
                data: editTeacher
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to update data!",
            status: false
        });
    }
}
const UpdateTeacherSocail_Media = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body; // Assuming you send the updated data in the request body

    // Create an object with only the social media fields you want to update
    const socialMediaUpdates = {
        fb_Url: updateData.fb_Url || null,
        Twitter_Url: updateData.Twitter_Url || null,
        Instagram_Url: updateData.Instagram_Url || null,
        Pinterest_url: updateData.Pinterest_url || null,
        Linked_In_Url: updateData.Linked_In_Url || null,
        YouTube_Url: updateData.YouTube_Url || null,
    };

    // Make sure to exclude the 'role' field from the updateData

    try {
        const editTeacher = await Teacher.findByIdAndUpdate(id, socialMediaUpdates, { new: true });

        if (!editTeacher) {
            res.status(200).json({
                message: "Teacher was not found!",
            });
        } else {
            res.status(201).json({
                message: "Social media data successfully updated!",
                success: true,
                data: editTeacher
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to update social media data!",
            status: false
        });
    }
}
const UpdateTeacherBankDetails = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body; // Assuming you send the updated data in the request body

    // Create an object with only the social media fields you want to update
    const socialMediaUpdates = {
        BankName: updateData.BankName || null,
        BranchName: updateData.BranchName || null,
        Account_Number: updateData.Account_Number || null,
        AccountName: updateData.AccountName || null,

    };

    // Make sure to exclude the 'role' field from the updateData

    try {
        const editTeacher = await Teacher.findByIdAndUpdate(id, socialMediaUpdates, { new: true });

        if (!editTeacher) {
            res.status(200).json({
                message: "Teacher was not found!",
            });
        } else {
            res.status(201).json({
                message: "Bank Account  data successfully updated!",
                success: true,
                data: editTeacher
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to update Bank Account  data !",
            status: false
        });
    }
}

const deleteTeacher = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the Teacher by ID
        const Teacher = await Teacher.findById(id);

        if (!Teacher) {
            return res.status(200).json({
                message: "Teacher was not found!",
            });
        }

        if (Teacher.role === "admin") {
            return res.status(403).json({
                message: "Admin Teacher cannot be deleted.",
                status: false,
            });
        }

        // If the Teacher is not an admin, proceed with the deletion
        const deletedTeacher = await Teacher.findByIdAndDelete(id);

        if (!deletedTeacher) {
            return res.status(200).json({
                message: "Teacher was not found!",
            });
        } else {
            return res.status(201).json({
                message: "Data successfully deleted!",
                success: true,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete data!",
            status: false,
        });
    }
}

module.exports = {
    AllTeachers, editTeacher, UpdateTeacher, deleteTeacher, UpdateTeacherSocail_Media, UpdateTeacherBankDetails
}
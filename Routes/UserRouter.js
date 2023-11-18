const express = require('express')
const { authenticateToken } = require('../config/JwtToken');
const { register, login, AllUsers, editUser, UpdateUsers, deleteUser, Accept_User } = require('../controllers/userController');
const { AddBlogs, AllBlogs, editBlog, UpdateBlogs, AddBlogsCategory, AllCategory, deleteBlogCategory, deleteBlog } = require('../controllers/blogController');
const { editTeacher, UpdateTeacher, deleteTeacher, AllTeachers, UpdateTeachersocail_Media, UpdateTeacherBankDetails } = require('../controllers/doctorController');



const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/AllUsers', AllUsers)
router.get('/editUser/:id', editUser)
router.get('/AllTeachers', AllTeachers)
router.put('/UpdateUsers/:id', UpdateUsers)
router.post('/AddBlogs', AddBlogs)
router.get('/AllBlogs', AllBlogs)
router.get('/editBlog/:id', editBlog)
router.put('/UpdateBlogs/:id', UpdateBlogs)
router.post('/AddBlogsCategory', AddBlogsCategory)
router.get('/AllCategory', AllCategory)
router.delete('/deleteBlogCategory/:id', deleteBlogCategory)
router.delete('/deleteBlog/:id', deleteBlog)
router.delete('/deleteUser/:id', deleteUser)
router.get('/editTeacher/:id', editTeacher)
router.put('/UpdateTeacher/:id', UpdateTeacher)
router.delete('/deleteTeacher/:id', deleteTeacher)
// router.put('/UpdateTeachersocail_Media/:id', UpdateTeachersocail_Media)
// router.put('/UpdateTeacherBankDetails/:id', UpdateTeacherBankDetails)
// // router.post('/Accept_User/:id', Accept_User)


module.exports = router;
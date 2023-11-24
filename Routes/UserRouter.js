const express = require('express')
const { authenticateToken } = require('../config/JwtToken');
const { register, login, AllUsers, editUser, UpdateUsers, deleteUser, Accept_User } = require('../controllers/userController');
const { AddBlogs, AllBlogs, editBlog, UpdateBlogs, AddBlogsCategory, AllCategory, deleteBlogCategory, deleteBlog } = require('../controllers/blogController');
const { editTeacher, UpdateTeacher, deleteTeacher, AllTeachers, UpdateTeachersocail_Media, UpdateTeacherBankDetails } = require('../controllers/doctorController');
const { AddCourseCategorys, AllCourseCategorys, editCourseCategory, deleteCourseCategory } = require('../controllers/courseCategoryController');
const { AddCourses, AllCourses, editCourse, UpdateCourses, deleteCourse } = require('../controllers/CourseController');
const upload = require('../config/multerConfig').upload;


const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/AllUsers', AllUsers)
router.get('/editUser/:id', editUser)
router.get('/AllTeachers', AllTeachers)
router.put('/UpdateUsers/:id', upload, UpdateUsers)
router.post('/AddBlogs', AddBlogs)
router.get('/AllBlogs', AllBlogs)
router.get('/editBlog/:id', editBlog)
router.put('/UpdateBlogs/:id',  upload,UpdateBlogs)
router.post('/AddBlogsCategory', AddBlogsCategory)
router.post('/AddCourseCategorys', AddCourseCategorys)
router.get('/AllCourseCategorys',AllCourseCategorys)
router.get('/AllCategory', AllCategory)
router.get('/editCourseCategory/:id',editCourseCategory)
router.delete('/deleteBlogCategory/:id', deleteBlogCategory)
router.delete('/deleteBlog/:id', deleteBlog)
router.delete('/deleteUser/:id', deleteUser)
router.get('/editTeacher/:id', editTeacher)
router.put('/UpdateTeacher/:id',  upload,UpdateTeacher)
router.delete('/deleteTeacher/:id', deleteTeacher)
router.delete('/deleteCourseCategory/:id', deleteCourseCategory)
router.post('/AddCourses', AddCourses)
router.get('/AllCourses', AllCourses)
router.get('/editCourse/:id', editCourse)
router.put('/UpdateCourses/:id',  upload,UpdateCourses)
router.delete('/deleteCourse/:id', deleteCourse)
// router.put('/UpdateTeachersocail_Media/:id', UpdateTeachersocail_Media)
// router.put('/UpdateTeacherBankDetails/:id', UpdateTeacherBankDetails)
// // router.post('/Accept_User/:id', Accept_User)


module.exports = router;
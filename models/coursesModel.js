const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var courseSchema = new mongoose.Schema({
    CourseName: {
        type: String,
        required: true,
        unique: true,
    },
    CourseDescription: {
        type: String,
        required: true
    },
    languages: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },

    CourseCategory_id: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        default: null
    },
    class_mode: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Course', courseSchema);
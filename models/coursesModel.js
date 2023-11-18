const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var courseSchema = new mongoose.Schema({
    CourseName: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    languages: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
        unique: true,
    },
    teachers_id: {
        type: String,
        required: true,
    },
});

//Export the model
module.exports = mongoose.model('Course', courseSchema);
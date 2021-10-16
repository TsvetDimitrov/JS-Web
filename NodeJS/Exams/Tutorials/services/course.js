const Course = require('../models/Course');
const User = require('../models/User');

async function createCourse(courseData){
    const course = new Course(courseData);

    await course.save();

    return course;
}

async function getAllCourses(){
    const courses = await Course.find({}).lean();

    return courses;
}

async function getCourseById(id){
    const course = await Course.findById(id);
    return course;
}


async function deleteCourse(id){
    return Course.findByIdAndDelete(id);
}


module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    deleteCourse
}
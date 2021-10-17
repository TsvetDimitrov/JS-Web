const Course = require('../models/Course');
const User = require('../models/User');

async function createCourse(courseData) {
    const course = new Course(courseData);

    await course.save();

    return course;
}

async function editCourse(id, courseData) {
    const course = await Course.findById(id);


    course.title = courseData.title;
    course.description = courseData.description;
    course.imageUrl = courseData.imageUrl;
    course.duration = courseData.duration;

    return course.save();
}

async function getAllCourses() {
    const courses = await Course.find({}).lean();

    return courses;
}

async function getCourseById(id) {
    const course = await Course.findById(id);
    return course;
}


async function deleteCourse(id) {
    return Course.findByIdAndDelete(id);
}

async function enrollCourse(courseId, userId) {
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (user._id == course.owner) {
        throw new Error('You cannot enroll in your own course!');
    }

    user.courses.push(courseId);
    course.enrolledUsers.push(userId);

    return Promise.all([user.save(), course.save()]);
}


module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    deleteCourse,
    editCourse,
    enrollCourse
}
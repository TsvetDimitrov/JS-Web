const User = require('../models/User');

async function createUser(firstName, lastName, email, hashedPassword) {

    const user = new User({
        firstName,
        lastName,
        email,
        hashedPassword
    });

    await user.save();

    return user;
}

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i')
    const user = await User.findOne({ email: { $regex: pattern } });

    return user;
}

async function getUserById(id){
    const user = await User.findById(id);

    return user;
}

async function getUsersById(ids) {
    const users = await User.find({ '_id': { $in: ids } }).lean();
    return users;
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    getUsersById
};
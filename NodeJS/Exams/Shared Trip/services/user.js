const User = require('../models/User');

async function createUser(email, gender, hashedPassword) {

    const user = new User({
        email,
        gender,
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

module.exports = {
    createUser,
    getUserByEmail,
    getUserById
};
const User = require('../models/User');

async function createUser(name, username, hashedPassword) {

    const user = new User({
        name,
        username,
        hashedPassword
    });

    await user.save();

    return user;
}

async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i')
    const user = await User.findOne({ username: { $regex: pattern } });

    return user;
}


async function getUserById(id){
    const user = await User.findById(id);

    return user;
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById
};
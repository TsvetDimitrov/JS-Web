const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: { type: String, required: [true, 'Username is required!'] },
    email: { type: String, required: [true, 'Email is required!'] },
    gender: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    tripHistory: [{ type: Schema.Types.ObjectId, ref: 'Trip', default: [] }]
});

module.exports = model('User', schema);
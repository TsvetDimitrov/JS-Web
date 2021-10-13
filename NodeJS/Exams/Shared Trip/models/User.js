const { Schema, model } = require('mongoose');

const schema = new Schema({
    email: { type: String, required: [true, 'Email is required!'] },
    gender: { type: String, required: [true, 'Gender is required!'] },
    hashedPassword: { type: String, required: [true, 'Password is required!'] },
    tripHistory: [{ type: Schema.Types.ObjectId, ref: 'Trip', default: [] }]
});

module.exports = model('User', schema);
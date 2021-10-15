const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Tutorial', default: [] }]
});

module.exports = model('User', schema);
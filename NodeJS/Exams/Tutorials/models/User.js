const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: { type: String, required: [true, 'Username is required!'], minlength: [5, 'Minimal length for username is 5 symbols'], match: [/^[0-9-A-Za-z]+$/, "Username should contain only english letter and digits"] },
    hashedPassword: { type: String, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Tutorial', default: [] }]
});

module.exports = model('User', schema);
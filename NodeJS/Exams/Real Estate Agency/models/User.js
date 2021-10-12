const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, minlength: [5, 'Username should be atleast 5 symbols'] },
    hashedPassword: { type: String, required: true },
    bookedHouses: [{ type: Schema.Types.ObjectId, ref: 'House', default: [] }]
});

module.exports = model('User', schema);
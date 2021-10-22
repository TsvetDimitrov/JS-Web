const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: [true, 'All fields are required'], minlength: [4, 'Name should be atleast 4 characters long!'] },
    city: { type: String, required: [true, 'All fields are required'], minlength: [3, 'City should be atleast 3 characters long!'] },
    imageUrl: { type: String, required: [true, 'All fields are required'], match: [/^https?/, 'Image must be a valid URL'] },
    rooms: { type: Number, required: [true, 'All fields are required'], min: [1, 'Rooms must be a number between 0 and 100'], max: [100, 'Rooms must be a number between 0 and 100'] },
    bookedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = model('Hotel', schema);
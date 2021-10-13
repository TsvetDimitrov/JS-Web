const { Schema, model } = require('mongoose');

const schema = new Schema({
    startPoint: { type: String, required: [true, 'All fields are required'] },
    endPoint: { type: String, required: [true, 'All fields are required'] },
    date: { type: String, required: [true, 'All fields are required'] },
    time: { type: String, required: [true, 'All fields are required'] },
    imageUrl: { type: String, required: [true, 'All fields are required'] },
    carBrand: { type: String, required: [true, 'All fields are required'] },
    seats: { type: Number, required: [true, 'All fields are required'] },
    price: { type: Number, required: [true, 'All fields are required'] },
    description: { type: String, required: [true, 'All fields are required'] },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    buddies: [{ type: Schema.Types.ObjectId, ref: 'User' }],

});

module.exports = model('Trip', schema);
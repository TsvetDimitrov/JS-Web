const { Schema, model } = require('mongoose');


const schema = new Schema({
    name: { type: String, required: [true, 'All fields are required'] },
    type: { type: String, required: [true, 'All fields are required'] },
    year: { type: Number, required: [true, 'All fields are required'] },
    city: { type: String, required: [true, 'All fields are required'] },
    imageUrl: { type: String, required: [true, 'All fields are required'], match: [/^https?/, 'Image must be a valid URL'] },
    pieces: { type: Number, required: [true, 'All fields are required'] },
    description: { type: String, required: [true, 'All fields are required'] },
    rentedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
});

module.exports = model("House", schema);
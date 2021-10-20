const { Schema, model } = require('mongoose');


const schema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    type: { type: String, required: [true, 'Type is required'], enum: { values: ['Apartment', 'Villa', 'House'], message: 'Types must be only Apartment, Villa and House!' } },
    year: { type: Number, required: [true, 'Year is required'] },
    city: { type: String, required: [true, 'City is required'] },
    imageUrl: { type: String, required: [true, 'Image url is required'], match: [/^https?/, 'Image must be a valid URL'] },
    pieces: { type: Number, required: [true, 'Pieces us required'] },
    description: { type: String, required: [true, 'Description is required'] },
    rentedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
}, { timestamps: true });

module.exports = model("House", schema);
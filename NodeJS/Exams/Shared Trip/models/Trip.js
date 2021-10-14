const { Schema, model } = require('mongoose');

const schema = new Schema({
    startPoint: { type: String, required: [true, 'StartPoint is required'], minlength: [4, 'StartPoint must be atleast 4 characters long.'] },
    endPoint: { type: String, required: [true, 'endPoint is required'], minlength: [4, 'EndPoint must be atleast 4 characters long.'] },
    date: { type: String, required: [true, 'date is required'] },
    time: { type: String, required: [true, 'time is required'] },
    imageUrl: { type: String, required: [true, 'imageUrl is required'] },
    carBrand: { type: String, required: [true, 'carBrand is required'], minlength: [4, 'carBrand must be atleast 4 characters long.'] },
    seats: { type: Number, required: [true, 'seats is required'], min: [1, 'Seats must be from 1-4'], max: [4, 'Seats must be from 1-4'] },
    price: { type: Number, required: [true, 'price is required'], min: [1, 'price must be from 1-50'], max: [50, 'price must be from 1-50'] },
    description: { type: String, required: [true, 'description is required'], minlength: [10, 'Description must be atleast 10 characters long.'] },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    buddies: [{ type: Schema.Types.ObjectId, ref: 'User' }],

});

module.exports = model('Trip', schema);
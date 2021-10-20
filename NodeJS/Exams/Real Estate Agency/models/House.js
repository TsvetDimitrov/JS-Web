const { Schema, model } = require('mongoose');


const schema = new Schema({
    name: { type: String, required: [true, 'Name is required'], minlength: [6, 'Name should be atleast 6 characters!'] },
    type: { type: String, required: [true, 'Type is required'], enum: { values: ['Apartment', 'Villa', 'House'], message: 'Types must be only Apartment, Villa and House!' } },
    year: { type: Number, required: [true, 'Year is required'], min: [1850, 'Year should be between 1850 and 2021'], max: [2021, 'Year should be between 1850 and 2021'] },
    city: { type: String, required: [true, 'City is required'], minlength: [4, 'City should be atleast 4 characters!'] },
    imageUrl: { type: String, required: [true, 'Image url is required'], match: [/^https?:\/\//, 'Image must be a valid URL'] },
    pieces: { type: Number, required: [true, 'Pieces us required'], min: [0, 'Available pieces should be between 0 and 10!'], max: [10, 'Available pieces should be between 0 and 10!'] },
    description: { type: String, required: [true, 'Description is required'], maxlength: [60, 'Description must be 60 characters max!'] },
    rentedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });


// schema.method('getTenants', function() {
//     return this.rentedBy.map(x => x.name).join(', ');
// });


module.exports = model("House", schema);
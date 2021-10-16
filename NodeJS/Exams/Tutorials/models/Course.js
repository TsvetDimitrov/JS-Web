const { Schema, model } = require('mongoose');


const schema = new Schema({
    title: { type: String, required: [true, 'Title field is required!'], unique: [true, 'Title should be unique!'] },
    description: { type: String, required: [true, 'Description field is required!'], maxlength: [50, 'Description must be 50 chars max.'] },
    imageUrl: { type: String, required: [true, 'ImageUrl field is required!'] },
    duration: { type: String, required: [true, 'Duration field is required!'] },
    createdAt: { type: String, type: Date, required: [true, 'Duration field is required!'] },
    enrolledUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = model('Course', schema);
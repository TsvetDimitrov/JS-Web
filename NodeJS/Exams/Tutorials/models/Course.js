const { Schema, model } = require('mongoose');


const schema = new Schema({
    title: { type: String, required: [true, 'Title field is required!'], unique: [true, 'Title should be unique!'], minlength: [4, 'Title should be atleast 4 characters long!'] },
    description: { type: String, required: [true, 'Description field is required!'], minlength:[20, 'Description must atleast 20 characters long!'], maxlength: [50, 'Description must be 50 chars max.'] },
    imageUrl: { type: String, required: [true, 'ImageUrl field is required!'], match: [/https? /, 'The url should start with http or https!'] },
    duration: { type: String, required: [true, 'Duration field is required!'] },
    createdAt: { type: String, required: [true, 'createdAt field is required!'] },
    enrolledUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Course', schema);
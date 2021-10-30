const { Schema, model } = require('mongoose');


const schema = new Schema({
    title: { type: String, required: [true, 'Title is required'], minlength: [6, 'Title shoud be atleast 6 characters long!'] },
    keyword: { type: String, required: [true, 'Keyword is required'], minlength: [6, 'Keyword shoud be atleast 6 characters long!'] },
    location: { type: String, required: [true, 'location is required'], maxlength: [10, 'location shoud be atleast 6 characters long!'] },
    description: { type: String, required: [true, 'description is required'], minlength: [8, 'description shoud be atleast 6 characters long!'] },
    dateCreated: { type: String, required: [true, 'dateCreated is required'], maxlength: [10, 'Date should be exactly 10 characters'], minlength: [10, 'Date should be exactly 10 characters'] },
    imageUrl: { type: String, required: [true, 'imageUrl is required'], match: [/^https?:\/\/.+/, 'Image Url is not valid!'] },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    votesOnPost: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    totalLikes: { type: Number, default: 0 },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
});




module.exports = model('Post', schema);

const { Schema, model } = require('mongoose');



const schema = new Schema({
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    imageUrl: { type: String, required: true },
    freeRooms: { type: Number, required: true },
    bookedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});



module.exports = model('Hotel', schema);

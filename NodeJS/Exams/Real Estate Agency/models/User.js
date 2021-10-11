const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, minlength: [5, 'Username should be atleast 5 symbols']},
    hashedPassword: {type: String, required: true}
});

module.exports = model('User', schema);
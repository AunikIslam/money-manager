const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

// another way of creating index
// userSchema.index({email: 1}, {unique: true})
module.exports = mongoose.model('User', userSchema);
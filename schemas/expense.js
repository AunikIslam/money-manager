const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    amount: {
        type: Number,
        required: true
    },
    account: {
        type: String,
        required: true,
        index: true
    },
    note: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Expense', expenseSchema);
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
        index: true,
        lowercase: true
    },
    amount: {
        type: Number,
        required: true
    },
    account: {
        type: String,
        required: true,
        index: true,
        lowercase: true
    },
    note: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    transaction_type: {
        type: String,
        required: true,
        index: true,
        lowercase: true
    }
});

expenseSchema.statics.prepareExpense = function (params) {
    return new this({
        user_id: params.user_id,
        category: params.category,
        amount: params.amount,
        account: params.account,
        note: params.note,
        date: params.date.split(' ')[0],
        time: params.date.split(' ')[1]
    });
}

module.exports = mongoose.model('Expense', expenseSchema);
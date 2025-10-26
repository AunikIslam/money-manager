const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseErrorEntrySchema = new Schema({
    category: {
        type: String
    },
    amount: {
        type: Number
    },
    account: {
        type: String
    },
    note: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    transactionType: {
        type: String
    },
    error: {
        type: String
    }
});

expenseErrorEntrySchema.statics.setCategory = function(category) {
    return this.category = category;
}

expenseErrorEntrySchema.statics.setAmount = function(amount) {
    return this.amount = amount;
}

expenseErrorEntrySchema.statics.setAccount = function(account) {
    return this.account = account;
}

expenseErrorEntrySchema.statics.setNote = function(note) {
    return this.note = note;
}
expenseErrorEntrySchema.statics.setDescription = function(description) {
    return this.description = description;
}
expenseErrorEntrySchema.statics.setDate = function(date) {
    return this.date = date;
}
expenseErrorEntrySchema.statics.setTime = function(time) {
    return this.time = time;
}
expenseErrorEntrySchema.statics.setTransactionType = function(type) {
    return this.transactionType = type;
}
expenseErrorEntrySchema.statics.setError = function(error) {
    return this.error = error;
}

module.exports = mongoose.model('ExpenseErrorEntry', expenseErrorEntrySchema);
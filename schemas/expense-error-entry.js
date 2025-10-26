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

expenseErrorEntrySchema.methods.setCategory = function(category) {
    this.category = category;
    return this;
}

expenseErrorEntrySchema.methods.setAmount = function(amount) {
    this.amount = amount;
    return this;
}

expenseErrorEntrySchema.methods.setAccount = function(account) {
    this.account = account;
    return this
}

expenseErrorEntrySchema.methods.setNote = function(note) {
    this.note = note;
    return this;
}
expenseErrorEntrySchema.methods.setDescription = function(description) {
    this.description = description;
    return this;
}
expenseErrorEntrySchema.methods.setDate = function(date) {
    this.date = date;
    return this;
}
expenseErrorEntrySchema.methods.setTime = function(time) {
    this.time = time;
    return this;
}
expenseErrorEntrySchema.methods.setTransactionType = function(type) {
    this.transactionType = type;
    return this;
}
expenseErrorEntrySchema.methods.setError = function(error) {
    this.error = error;
    return this;
}

module.exports = mongoose.model('ExpenseErrorEntry', expenseErrorEntrySchema);
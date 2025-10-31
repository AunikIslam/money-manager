const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseUploadSchema = new Schema({
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
    status: {
        type: String
    }
});

expenseUploadSchema.methods.setCategory = function(category) {
    this.category = category;
    return this;
}

expenseUploadSchema.methods.setAmount = function(amount) {
    this.amount = amount;
    return this;
}

expenseErrorEntrySchema.methods.setAccount = function(account) {
    this.account = account;
    return this
}

expenseUploadSchema.methods.setNote = function(note) {
    this.note = note;
    return this;
}
expenseUploadSchema.methods.setDescription = function(description) {
    this.description = description;
    return this;
}
expenseUploadSchema.methods.setDate = function(date) {
    this.date = date;
    return this;
}
expenseUploadSchema.methods.setTime = function(time) {
    this.time = time;
    return this;
}
expenseUploadSchema.methods.setTransactionType = function(type) {
    this.transactionType = type;
    return this;
}
expenseUploadSchema.methods.setStatus = function(status) {
    this.status = status;
    return this;
}

module.exports = mongoose.model('ExpenseUploadSchema', expenseUploadSchema);
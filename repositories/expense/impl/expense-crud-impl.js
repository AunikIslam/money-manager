const Expense = require('../../../schemas/expense');

class ExpenseCrudImpl {
    static async createExpense(expense) {
       try {
           await Expense.create(expense)
       } catch (error) {
           throw error;
       }
    }
}

module.exports = ExpenseCrudImpl;
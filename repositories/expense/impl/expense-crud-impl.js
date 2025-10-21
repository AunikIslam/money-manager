const Expense = require('../../../schemas/expense');
const SessionContextService = require('../../../services/session-context-service')

class ExpenseCrudImpl {
    static async createExpense(data) {
       try {
           data.user_id = SessionContextService.getUserId();
           const expense = Expense.prepareExpense(data);
           Expense.create(expense);
       } catch (error) {
           throw error;
       }
    }
}

module.exports = ExpenseCrudImpl;
const expenseCrudImpl = require('../repositories/expense/impl/expense-crud-impl');
exports.createExpense = async function (req, res) {
    try {
        await expenseCrudImpl.createExpense(req.body);
        console.log(`Expense Crud created successfully.`);
    } catch (error) {
        console.log(`Error during expense creation. ${error.message}`);
    }
}
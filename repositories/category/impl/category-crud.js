const Category = require('../../../schemas/category');

class CategoryCrudImpl {
    static async createCategories(category) {
        try {
            await Category.create(category);
        } catch (error) {

        }
    }
}

module.exports = CategoryCrudImpl;
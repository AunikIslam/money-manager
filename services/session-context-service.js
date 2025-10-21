const {AsyncLocalStorage} = require('async_hooks');
const asyncLocalStorage = new AsyncLocalStorage();

class SessionContextService {
    static initialize(context, callback) {
        asyncLocalStorage.run(context, callback);
    }

    static setUserId(userId) {
        asyncLocalStorage.getStore().userId = userId;
    }

    static getUserId() {
        return asyncLocalStorage.getStore().userId;
    }
}

module.exports = SessionContextService;
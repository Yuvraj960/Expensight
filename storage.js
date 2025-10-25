const StorageManager = {
    // Keys for localStorage
    KEYS: {
        USERS: 'expense_tracker_users',
        CURRENT_USER: 'expense_tracker_current_user',
        EXPENSES_PREFIX: 'expense_tracker_expenses_'
    },

    // User Management
    getUsers() {
        const users = localStorage.getItem(this.KEYS.USERS);
        return users ? JSON.parse(users) : [];
    },

    saveUser(user) {
        const users = this.getUsers();
        users.push(user);
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
    },

    getUserByUsername(username) {
        const users = this.getUsers();
        return users.find(user => user.username === username);
    },

    // Current User Session
    getCurrentUser() {
        return localStorage.getItem(this.KEYS.CURRENT_USER);
    },

    setCurrentUser(username) {
        localStorage.setItem(this.KEYS.CURRENT_USER, username);
    },

    clearCurrentUser() {
        localStorage.removeItem(this.KEYS.CURRENT_USER);
    },

    // Expense Management
    getUserExpenses(username) {
        const key = this.KEYS.EXPENSES_PREFIX + username;
        const expenses = localStorage.getItem(key);
        return expenses ? JSON.parse(expenses) : [];
    },

    saveExpenses(username, expenses) {
        const key = this.KEYS.EXPENSES_PREFIX + username;
        localStorage.setItem(key, JSON.stringify(expenses));
    },

    addExpense(username, expense) {
        const expenses = this.getUserExpenses(username);
        expenses.push(expense);
        this.saveExpenses(username, expenses);
    },

    updateExpense(username, expenseId, updatedExpense) {
        const expenses = this.getUserExpenses(username);
        const index = expenses.findIndex(exp => exp.id === expenseId);
        if (index !== -1) {
            expenses[index] = { ...expenses[index], ...updatedExpense };
            this.saveExpenses(username, expenses);
            return true;
        }
        return false;
    },

    deleteExpense(username, expenseId) {
        const expenses = this.getUserExpenses(username);
        const filteredExpenses = expenses.filter(exp => exp.id !== expenseId);
        this.saveExpenses(username, filteredExpenses);
        return true;
    },

    // Utility
    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
};

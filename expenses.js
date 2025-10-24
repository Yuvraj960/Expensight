const ExpenseManager = {
    currentUsername: null,
    expenses: [],

    init(username) {
        this.currentUsername = username;
        this.loadExpenses();
    },

    loadExpenses() {
        this.expenses = StorageManager.getUserExpenses(this.currentUsername);
    },

    addExpense(name, amount, category, date) {
        const expense = {
            id: StorageManager.generateId(),
            name: name.trim(),
            amount: parseFloat(amount),
            category: category,
            date: date
        };

        StorageManager.addExpense(this.currentUsername, expense);
        this.loadExpenses();
        return expense;
    },

    updateExpense(id, name, amount, category, date) {
        const updatedExpense = {
            name: name.trim(),
            amount: parseFloat(amount),
            category: category,
            date: date
        };

        const success = StorageManager.updateExpense(this.currentUsername, id, updatedExpense);
        if (success) {
            this.loadExpenses();
        }
        return success;
    },

    deleteExpense(id) {
        const success = StorageManager.deleteExpense(this.currentUsername, id);
        if (success) {
            this.loadExpenses();
        }
        return success;
    },

    getExpenseById(id) {
        return this.expenses.find(exp => exp.id === id);
    },

    filterByCategory(category) {
        if (!category) {
            return this.expenses;
        }
        return this.expenses.filter(exp => exp.category === category);
    },

    searchExpenses(query) {
        if (!query) {
            return this.expenses;
        }
        const lowerQuery = query.toLowerCase();
        return this.expenses.filter(exp => 
            exp.name.toLowerCase().includes(lowerQuery)
        );
    },

    sortExpenses(expenses, sortBy) {
        const sorted = [...expenses];
        
        switch(sortBy) {
            case 'date-desc':
                sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'date-asc':
                sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'amount-desc':
                sorted.sort((a, b) => b.amount - a.amount);
                break;
            case 'amount-asc':
                sorted.sort((a, b) => a.amount - b.amount);
                break;
            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        
        return sorted;
    },

    calculateTotal(expenses = this.expenses) {
        return expenses.reduce((total, exp) => total + exp.amount, 0);
    }
};

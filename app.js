const App = {
    init() {
        UIManager.init();
        this.checkAuth();
        this.attachEventListeners();
    },

    checkAuth() {
        if (AuthManager.checkAuthStatus()) {
            const username = AuthManager.getCurrentUsername();
            this.loadApp(username);
        } else {
            UIManager.showAuthPage();
        }
    },

    loadApp(username) {
        ExpenseManager.init(username);
        UIManager.showAppPage();
        UIManager.updateUserDisplay(username);
        UIManager.setTodayDate();
        this.refreshExpenses();
    },

    attachEventListeners() {
        // Auth event listeners
        UIManager.elements.showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            UIManager.showSignupForm();
        });

        UIManager.elements.showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            UIManager.showLoginForm();
        });

        UIManager.elements.loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        UIManager.elements.signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleSignup();
        });

        UIManager.elements.logoutBtn.addEventListener('click', () => {
            this.handleLogout();
        });

        // Expense form
        UIManager.elements.expenseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleExpenseSubmit();
        });

        UIManager.elements.cancelEditBtn.addEventListener('click', () => {
            UIManager.clearExpenseForm();
        });

        // Filters
        UIManager.elements.searchInput.addEventListener('input', () => {
            this.refreshExpenses();
        });

        UIManager.elements.filterCategory.addEventListener('change', () => {
            this.refreshExpenses();
        });

        UIManager.elements.sortBy.addEventListener('change', () => {
            this.refreshExpenses();
        });

        // Delegate events for expense list
        UIManager.elements.expensesList.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-btn')) {
                const id = e.target.dataset.id;
                this.handleEdit(id);
            } else if (e.target.classList.contains('delete-btn')) {
                const id = e.target.dataset.id;
                this.handleDelete(id);
            }
        });
    },

    handleLogin() {
        const username = UIManager.elements.loginUsername.value;
        const password = UIManager.elements.loginPassword.value;

        const result = AuthManager.login(username, password);

        if (result.success) {
            UIManager.showNotification(result.message, 'success');
            setTimeout(() => {
                this.loadApp(username);
            }, 500);
        } else {
            UIManager.showError(UIManager.elements.loginError, result.message);
        }
    },

    handleSignup() {
        const username = UIManager.elements.signupUsername.value;
        const password = UIManager.elements.signupPassword.value;
        const confirmPassword = UIManager.elements.signupConfirm.value;

        const validation = AuthManager.validateSignup(username, password, confirmPassword);

        if (!validation.valid) {
            UIManager.showError(UIManager.elements.signupError, validation.message);
            return;
        }

        const result = AuthManager.signup(username, password);

        if (result.success) {
            UIManager.showNotification(result.message, 'success');
            setTimeout(() => {
                UIManager.showLoginForm();
            }, 1000);
        }
    },

    handleLogout() {
        UIManager.showConfirmDialog('Are you sure you want to logout?', () => {
            AuthManager.logout();
            UIManager.showNotification('Logged out successfully', 'info');
            UIManager.showAuthPage();
            UIManager.showLoginForm();
        });
    },

    handleExpenseSubmit() {
        const id = UIManager.elements.expenseId.value;
        const name = UIManager.elements.expenseName.value;
        const amount = UIManager.elements.expenseAmount.value;
        const category = UIManager.elements.expenseCategory.value;
        const date = UIManager.elements.expenseDate.value;

        if (!name || !amount || !category || !date) {
            UIManager.showNotification('Please fill all fields', 'error');
            return;
        }

        if (parseFloat(amount) <= 0) {
            UIManager.showNotification('Amount must be greater than 0', 'error');
            return;
        }

        if (id) {
            // Update existing expense
            ExpenseManager.updateExpense(id, name, amount, category, date);
            UIManager.showNotification('Expense updated successfully', 'success');
        } else {
            // Add new expense
            ExpenseManager.addExpense(name, amount, category, date);
            UIManager.showNotification('Expense added successfully', 'success');
        }

        UIManager.clearExpenseForm();
        this.refreshExpenses();
    },

    handleEdit(id) {
        const expense = ExpenseManager.getExpenseById(id);
        if (expense) {
            UIManager.populateExpenseForm(expense);
        }
    },

    handleDelete(id) {
        UIManager.showConfirmDialog('Are you sure you want to delete this expense?', () => {
            ExpenseManager.deleteExpense(id);
            UIManager.showNotification('Expense deleted successfully', 'success');
            this.refreshExpenses();
        });
    },

    refreshExpenses() {
        const searchQuery = UIManager.elements.searchInput.value;
        const filterCategory = UIManager.elements.filterCategory.value;
        const sortBy = UIManager.elements.sortBy.value;

        const filteredExpenses = ExpenseManager.getFilteredAndSortedExpenses(
            searchQuery,
            filterCategory,
            sortBy
        );

        UIManager.renderExpensesList(filteredExpenses);

        const total = ExpenseManager.calculateTotal();
        const count = ExpenseManager.expenses.length;
        UIManager.updateSummary(total, count);

        const breakdown = ExpenseManager.getCategoryBreakdown();
        UIManager.renderCategoryBreakdown(breakdown);
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

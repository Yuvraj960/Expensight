const UIManager = {
    elements: {},

    init() {
        // Cache DOM elements
        this.elements = {
            // Pages
            authPage: document.getElementById('auth-page'),
            appPage: document.getElementById('app-page'),

            // Auth forms
            loginForm: document.getElementById('login-form'),
            signupForm: document.getElementById('signup-form'),
            loginUsername: document.getElementById('login-username'),
            loginPassword: document.getElementById('login-password'),
            signupUsername: document.getElementById('signup-username'),
            signupPassword: document.getElementById('signup-password'),
            signupConfirm: document.getElementById('signup-confirm'),
            loginError: document.getElementById('login-error'),
            signupError: document.getElementById('signup-error'),
            loginBtn: document.getElementById('login-btn'),
            signupBtn: document.getElementById('signup-btn'),
            showSignup: document.getElementById('show-signup'),
            showLogin: document.getElementById('show-login'),

            // Header
            usernameDisplay: document.getElementById('username-display'),
            logoutBtn: document.getElementById('logout-btn'),

            // Summary
            totalAmount: document.getElementById('total-amount'),
            totalCount: document.getElementById('total-count'),

            // Expense form
            expenseForm: document.getElementById('expense-form'),
            expenseName: document.getElementById('expense-name'),
            expenseAmount: document.getElementById('expense-amount'),
            expenseCategory: document.getElementById('expense-category'),
            expenseDate: document.getElementById('expense-date'),
            expenseId: document.getElementById('expense-id'),
            submitBtn: document.getElementById('submit-btn'),
            cancelEditBtn: document.getElementById('cancel-edit-btn'),

            // Filters
            searchInput: document.getElementById('search-input'),
            filterCategory: document.getElementById('filter-category'),
            sortBy: document.getElementById('sort-by'),

            // Lists
            expensesList: document.getElementById('expenses-list'),
            categoryBreakdown: document.getElementById('category-breakdown'),

            // Notification & Modal
            notification: document.getElementById('notification'),
            confirmDialog: document.getElementById('confirm-dialog'),
            confirmMessage: document.getElementById('confirm-message'),
            confirmYes: document.getElementById('confirm-yes'),
            confirmNo: document.getElementById('confirm-no')
        };
    },

    showAuthPage() {
        this.elements.authPage.classList.remove('hidden');
        this.elements.appPage.classList.add('hidden');
    },

    showAppPage() {
        this.elements.authPage.classList.add('hidden');
        this.elements.appPage.classList.remove('hidden');
    },

    showLoginForm() {
        this.elements.loginForm.classList.remove('hidden');
        this.elements.signupForm.classList.add('hidden');
        this.clearAuthErrors();
    },

    showSignupForm() {
        this.elements.loginForm.classList.add('hidden');
        this.elements.signupForm.classList.remove('hidden');
        this.clearAuthErrors();
    },

    showError(element, message) {
        element.textContent = message;
        element.classList.add('show');
    },

    clearAuthErrors() {
        this.elements.loginError.classList.remove('show');
        this.elements.signupError.classList.remove('show');
        this.elements.loginUsername.value = '';
        this.elements.loginPassword.value = '';
        this.elements.signupUsername.value = '';
        this.elements.signupPassword.value = '';
        this.elements.signupConfirm.value = '';
    },

    showNotification(message, type = 'info') {
        this.elements.notification.textContent = message;
        this.elements.notification.className = `notification ${type}`;
        this.elements.notification.classList.remove('hidden');

        setTimeout(() => {
            this.elements.notification.classList.add('hidden');
        }, 3000);
    },

    showConfirmDialog(message, onConfirm) {
        this.elements.confirmMessage.textContent = message;
        this.elements.confirmDialog.classList.remove('hidden');

        const handleYes = () => {
            onConfirm();
            this.hideConfirmDialog();
        };

        const handleNo = () => {
            this.hideConfirmDialog();
        };

        this.elements.confirmYes.onclick = handleYes;
        this.elements.confirmNo.onclick = handleNo;
    },

    hideConfirmDialog() {
        this.elements.confirmDialog.classList.add('hidden');
    },

    updateUserDisplay(username) {
        this.elements.usernameDisplay.textContent = `Welcome, ${username}`;
    },

    setTodayDate() {
        const today = new Date().toISOString().split('T')[0];
        this.elements.expenseDate.value = today;
    },

    clearExpenseForm() {
        this.elements.expenseForm.reset();
        this.elements.expenseId.value = '';
        this.elements.submitBtn.textContent = 'Add Expense';
        this.elements.cancelEditBtn.classList.add('hidden');
        this.setTodayDate();
    },

    populateExpenseForm(expense) {
        this.elements.expenseId.value = expense.id;
        this.elements.expenseName.value = expense.name;
        this.elements.expenseAmount.value = expense.amount;
        this.elements.expenseCategory.value = expense.category;
        this.elements.expenseDate.value = expense.date;
        this.elements.submitBtn.textContent = 'Update Expense';
        this.elements.cancelEditBtn.classList.remove('hidden');

        // Scroll to form
        this.elements.expenseForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    updateSummary(total, count) {
        this.elements.totalAmount.textContent = `₹${total.toFixed(2)}`;
        this.elements.totalCount.textContent = count;
    },

    renderExpensesList(expenses) {
        if (expenses.length === 0) {
            this.elements.expensesList.innerHTML = '<p class="empty-state">No expenses found. Try adjusting your filters or add a new expense!</p>';
            return;
        }

        const html = expenses.map(expense => `
            <div class="expense-item" data-id="${expense.id}">
                <div class="expense-info">
                    <h4>${expense.name}</h4>
                    <div class="expense-details">
                        <span class="expense-category">${expense.category}</span>
                        <span>📅 ${this.formatDate(expense.date)}</span>
                    </div>
                </div>
                <div>
                    <div class="expense-amount">₹${expense.amount.toFixed(2)}</div>
                    <div class="expense-actions">
                        <button class="btn btn-small btn-secondary edit-btn" data-id="${expense.id}">Edit</button>
                        <button class="btn btn-small btn-danger delete-btn" data-id="${expense.id}">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');

        this.elements.expensesList.innerHTML = html;
    },

    renderCategoryBreakdown(breakdown) {
        const categories = Object.keys(breakdown);

        if (categories.length === 0) {
            this.elements.categoryBreakdown.innerHTML = '<p class="empty-state">No data available</p>';
            return;
        }

        // Sort by total amount descending
        categories.sort((a, b) => breakdown[b].total - breakdown[a].total);

        const html = categories.map(category => `
            <div class="category-item">
                <div class="category-item-left">
                    <div>
                        <div class="category-name">${category}</div>
                        <div class="category-count">${breakdown[category].count} transaction${breakdown[category].count > 1 ? 's' : ''}</div>
                    </div>
                </div>
                <div class="category-amount">₹${breakdown[category].total.toFixed(2)}</div>
            </div>
        `).join('');

        this.elements.categoryBreakdown.innerHTML = html;
    },

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-IN', options);
    }
};

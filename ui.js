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
};
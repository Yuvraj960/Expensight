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
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

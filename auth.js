const AuthManager = {
    validateSignup(username, password, confirmPassword) {
        if (!username || username.trim().length < 3) {
            return { valid: false, message: 'Username must be at least 3 characters long' };
        }

        if (!password || password.length < 6) {
            return { valid: false, message: 'Password must be at least 6 characters long' };
        }

        if (password !== confirmPassword) {
            return { valid: false, message: 'Passwords do not match' };
        }

        // Check if username already exists
        const existingUser = StorageManager.getUserByUsername(username.trim());
        if (existingUser) {
            return { valid: false, message: 'Username already exists' };
        }

        return { valid: true };
    },

    signup(username, password) {
        const user = {
            id: StorageManager.generateId(),
            username: username.trim(),
            password: password // In a real app, this should be hashed
        };

        StorageManager.saveUser(user);
        return { success: true, message: 'Account created successfully!' };
    },

    validateLogin(username, password) {
        if (!username || !password) {
            return { valid: false, message: 'Please enter both username and password' };
        }

        const user = StorageManager.getUserByUsername(username.trim());
        if (!user) {
            return { valid: false, message: 'Invalid username or password' };
        }

        if (user.password !== password) {
            return { valid: false, message: 'Invalid username or password' };
        }

        return { valid: true, user: user };
    },

    login(username, password) {
        const validation = this.validateLogin(username, password);
        if (!validation.valid) {
            return { success: false, message: validation.message };
        }

        StorageManager.setCurrentUser(username.trim());
        return { success: true, message: 'Login successful!' };
    },

    logout() {
        StorageManager.clearCurrentUser();
    },

    checkAuthStatus() {
        return StorageManager.getCurrentUser() !== null;
    },

    getCurrentUsername() {
        return StorageManager.getCurrentUser();
    }
};

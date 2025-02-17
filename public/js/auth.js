// Add this to your existing JavaScript files
function showLoginModal() {
    const modalHTML = `
        <div class="auth-modal" id="loginModal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal()">&times;</span>
                <div class="tabs">
                    <div class="tab active" onclick="switchTab('login')">Login</div>
                    <div class="tab" onclick="switchTab('signup')">Sign Up</div>
                </div>

                <!-- Login Form -->
                <div id="loginForm" class="form-container">
                    <div class="form-group">
                        <label for="loginEmail">Email</label>
                        <input type="email" id="loginEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" id="loginPassword" required>
                    </div>
                    <button onclick="handleLogin()">Login</button>
                </div>

                <!-- Signup Form -->
                <div id="signupForm" class="form-container" style="display: none;">
                    <div class="form-group">
                        <label for="signupUsername">Username</label>
                        <input type="text" id="signupUsername" required>
                    </div>
                    <div class="form-group">
                        <label for="signupEmail">Email</label>
                        <input type="email" id="signupEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="signupPassword">Password</label>
                        <input type="password" id="signupPassword" required>
                    </div>
                    <button onclick="handleSignup()">Sign Up</button>
                </div>

                <div id="message" class="error-message"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeModal() {
    const modal = document.querySelector('.auth-modal');
    if (modal) modal.remove();
} 
const usersDB = {};

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const registerMessage = document.getElementById('register-message');

    if (!validateEmail(email)) {
        registerMessage.textContent = 'Email is not valid.';
        return;
    }

    if (usersDB[email]) {
        registerMessage.textContent = 'Email already registered. Please use another email.';
        return;
    }

    usersDB[email] = { password };
    registerMessage.textContent = 'Registration successful! Redirecting to login...';

    setTimeout(() => {
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
        registerMessage.textContent = '';
    }, 2000);
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const loginMessage = document.getElementById('login-message');

    if (!usersDB[email] || usersDB[email].password !== password) {
        loginMessage.textContent = 'Invalid email or password.';
        return;
    }

    localStorage.setItem('loggedInUser', email);
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('home-section').style.display = 'block';
    document.getElementById('user-name').textContent = email;
    loginMessage.textContent = '';
});

document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
    document.getElementById('login-section').style.display = 'none';
});

window.addEventListener('load', function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('home-section').style.display = 'block';
        document.getElementById('user-name').textContent = loggedInUser;
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

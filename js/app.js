'use strict';

////////////////////////////////////////////////////////////////////
// Name and password from register form
const loginForm = document.getElementById('loginAccount');
const registerForm = document.getElementById('registerAccount');
const userName = document.getElementById('signUpEmail');
const password = document.getElementById('signUpPass');
const loginUserName = document.getElementById('loginUserName');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');
const signUpBtn = document.getElementById('createAccountBtn');
const loginLink = document.getElementById('loginLink');
const signUpLink = document.getElementById('signUpLink');
const createAccountBtn = document.getElementById('createAccountBtn');
const overlay = document.getElementById('overlay');

class User {
    constructor(userName, password) {
        this.userName = userName;
        this.password = password;
    }
}

class Storage {
    _getUsers() {
        let users = [];
        if (localStorage.getItem('users') !== null) {
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    }
    _storeUser(user) {
        const users = Storage.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

class App {}

function addUser() {
    const user = new User(userName.value, password.value);

    if (user != '') {
        Storage.storeUser(user);
    }
}

// TODO make a sign up function validation check

function checkLoginData() {
    const users = Storage.getUsers();
    let storedUserNames = [];
    let storedPasswords = [];

    for (let i = 0; i < users.length; i++) {
        storedUserNames.push(users[i].userName);
        storedPasswords.push(users[i].password);
    }

    if (
        storedUserNames.includes(loginUserName.value) &&
        storedPasswords.includes(loginPassword.value)
    ) {
        alert('Welcome! You are logged in.');
        overlay.classList.add('overlay--hidden');
        hideForm(loginForm);
    } else {
        alert('Error! Please enter valid credentials.');
    }
}

function hideForm(formName) {
    formName.classList.add('hide-element');
}

function showForm(formName) {
    formName.classList.remove('hide-element');
}

// Event listeners
signUpLink.addEventListener('click', function () {
    hideForm(loginForm);
    showForm(registerForm);
});

loginLink.addEventListener('click', function () {
    showForm(loginForm);
    hideForm(registerForm);
});

createAccountBtn.addEventListener('click', function () {
    alert('Welcome! You are logged in.');
    hideForm(registerForm);
    showForm(loginForm);
});


window.addEventListener('DOMContentLoaded', function() {
    overlay.classList.remove('overlay--hidden');
    hideForm(loginForm);
    showForm(registerForm);
});

registerForm.addEventListener('submit', addUser);
loginBtn.addEventListener('click', checkLoginData);
const app = new App();

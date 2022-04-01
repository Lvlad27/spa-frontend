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
const createAccountBtn = document.getElementById('createAccountBtn');

class CreateUser {
    constructor(userName, password) {
        this.userName = userName;
        this.password = password;
    }
}

class Storage {
    static getUsers() {
        let users;
        if (localStorage.getItem('users') === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem('users'));
        }

        return users;
    }

    static storeUser(user) {
        const users = Storage.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function addUser() {
    const user = new CreateUser(userName.value, password.value);

    if (user != '') {
        Storage.storeUser(user);
    }
}

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
    } else {
        alert('Error! Please enter valid credentials.');
    }
}

registerForm.addEventListener('submit', addUser);
loginBtn.addEventListener('click', checkLoginData);

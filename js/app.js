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
    let users = Storage.getUsers();
    let storedUserName = Storage.getUsers()[0].userName;
    let storedPassword = Storage.getUsers()[0].password;

    console.log(users);

    /*
    
    if (
        loginUserName.value === storedUserName &&
        loginPass.value === storedPass
    ) {
        alert('You are loged in.');
    } else {
        alert('ERROR.');
    }
    */
}

registerForm.addEventListener('submit', addUser);
loginBtn.addEventListener('click', checkLoginData);

/*
// Storing input from register form
function registerFormStorage() {
    localStorage.setItem('userName', userName.value);
    localStorage.setItem('password', password.value);
}

// check if stored data from register form is equal to entered data in the login form
function checkUserLoginData() {
    // stored data from register form
    let storedUserName = localStorage.getItem('userName');
    let storedPassword = localStorage.getItem('password');

    // entered data from login form
    let loginUserName = document.getElementById('loginUserName');
    let loginPassword = document.getElementById('loginPassword');

    // actual check
    if (
        loginUserName.value == storedUserName &&
        loginPass.value == storedPass
    ) {
        alert('You are loged in.');
    } else {
        alert('ERROR.');
    }
}

// EVENT LISTENERS
createAccountBtn.addEventListener('submit', registerFormStorage);
loginBtn.addEventListener('click', checkUserLoginData);
*/

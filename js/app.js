'use strict';

////////////////////////////////////////////////////////////////////
class User {
    constructor(userName, password) {
        this.userName = userName;
        this.password = password;
    }
}

class Storage {
    getUsers() {
        let users = [];
        if (localStorage.getItem('users') !== null) {
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    }

    storeUser(user) {
        const storage = new Storage();
        const users = storage.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

/////////////////////////////////////////
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

const storage = new Storage();

class App {
    constructor() {
        // Attach event listeners
        window.addEventListener(
            'DOMContentLoaded',
            function () {
                overlay.classList.remove('overlay--hidden');
                this.hideForm(loginForm);
                this.showForm(registerForm);
            }.bind(this)
        );

        createAccountBtn.addEventListener(
            'click',
            this.checkRegistrationData.bind(this).bind(this)
        );

        signUpLink.addEventListener(
            'click',
            function () {
                this.hideForm(loginForm);
                this.showForm(registerForm);
            }.bind(this)
        );

        loginLink.addEventListener(
            'click',
            function () {
                this.showForm(loginForm);
                this.hideForm(registerForm);
            }.bind(this)
        );

        registerForm.addEventListener('submit', this.addUser.bind(this));
        loginBtn.addEventListener('click', this.checkLoginData.bind(this));
    }

    hideForm(formName) {
        formName.classList.add('hide-element');
    }

    showForm(formName) {
        formName.classList.remove('hide-element');
    }

    addUser() {
        const user = new User(userName.value, password.value);

        if (user != '') {
            storage.storeUser(user);
        }
    }

    // TODO make a sign up function validation check
    checkLoginData() {
        const users = storage.getUsers();
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
            this.hideForm(loginForm);
        } else {
            alert('Error! Please enter your email and password.');
        }
    }

    checkRegistrationData() {
        if (userName.checkValidity() && password.checkValidity()) {
            alert('Your account has been registered!');
            this.showForm(loginForm);
            this.hideForm(registerForm);
        } else {
            alert('Something is wrong with your email or password!');
        }
    }
}

const app = new App();

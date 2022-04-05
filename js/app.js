import User from './user.js';
import Storage from './storage.js';

////////////////////////////////////////////////////////////////////
export const loginForm = document.getElementById('loginAccount');
export const registerForm = document.getElementById('registerAccount');
export const userName = document.getElementById('signUpEmail');
export const password = document.getElementById('signUpPass');
export const loginUserName = document.getElementById('loginUserName');
export const loginPassword = document.getElementById('loginPassword');
export const loginBtn = document.getElementById('loginBtn');
export const signUpBtn = document.getElementById('createAccountBtn');
export const loginLink = document.getElementById('loginLink');
export const signUpLink = document.getElementById('signUpLink');
export const createAccountBtn = document.getElementById('createAccountBtn');
export const overlay = document.getElementById('overlay');

////////////////////////////////////////////////////////////////////
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

        createAccountBtn.addEventListener('click', this.checkRegistrationData.bind(this));

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
        const storage = new Storage();
        const user = new User(userName.value, password.value);
        if (user != '') {
            storage.storeUser(user);
        }
    }

    checkLoginData() {
        const userStorage = Storage.getUsers();
        console.log(userStorage);

        if (userStorage[loginUserName.value]) {
            alert('Welcome! You are logged in.');
            overlay.classList.add('overlay--hidden');
            this.hideForm(loginForm);
        } else {
            alert('Sorry! Incorrect email and password.');
        }
    }

    checkRegistrationData() {
        if (userName.checkValidity() && password.checkValidity()) {
            alert('Your account has been registered!');
            document.querySelector('form').reset();
            this.showForm(loginForm);
            this.hideForm(registerForm);
        } else {
            alert('Something is wrong with your email or password!');
        }
    }
}

export default App;

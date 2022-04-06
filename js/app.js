import User from './user.js';
import Storage from './storage.js';
import FormValidation from './formValidation.js';

////////////////////////////////////////////////////////////////////
export let id = id => document.getElementById(id);

export const loginForm = id('loginAccount'),
    registerForm = id('registerAccount'),
    userName = id('signUpEmail'),
    password = id('signUpPass'),
    loginUserName = id('loginUserName'),
    loginPassword = id('loginPassword'),
    loginBtn = id('loginBtn'),
    signUpBtn = id('createAccountBtn'),
    loginLink = id('loginLink'),
    signUpLink = id('signUpLink'),
    createAccountBtn = id('createAccountBtn'),
    overlay = id('overlay'),
    form = document.querySelector('.form'),
    formInput = ['email', 'password', 'passwordConfirmation'],
    successIcon = formInput.parentElement.querySelector('.success-icon'),
    errorIcon = formInput.parentElement.querySelector('.error-icon'),
    errorMessage = field.parentElement.querySelector('.error-message');

////////////////////////////////////////////////////////////////////
class App {
    constructor(storage) {
        this.storage = storage;
        // Attach event listeners
        window.addEventListener('DOMContentLoaded', this.pageLoadEvent.bind(this));
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

    pageLoadEvent() {
        overlay.classList.remove('overlay--hidden');
        this.hideForm(loginForm);
        this.showForm(registerForm);
        // this.animateFadeIn(registerForm);
    }

    /*
    animateFadeIn(element) {
        element.classList.remove('FadeOut');
        element.classList.add('FadeIn');
    }

    animateFadeOut(element) {
        element.classList.remove('FadeIn');
        element.classList.add('FadeOut');
    }
    */

    addUser() {
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

import User from './user.js';
import Storage from './storage.js';

////////////////////////////////////////////////////////////////////
export let id = id => document.getElementById(id);

export const loginFormContainer = id('loginAccount'),
    registerFormContainer = id('registerAccount'),
    userName = id('signUpEmail'),
    password = id('signUpPass'),
    passwordConfirm = id('passwordConfirm'),
    loginUserName = id('loginUserName'),
    loginPassword = id('loginPassword'),
    loginBtn = id('loginBtn'),
    signUpBtn = id('createAccountBtn'),
    loginLink = id('loginLink'),
    signUpLink = id('signUpLink'),
    createAccountBtn = id('createAccountBtn'),
    overlay = id('overlay'),
    loginFormInputs = ['loginUserName', 'loginPassword'],
    signUpFormInputs = ['signUpEmail', 'signUpPass', 'passwordConfirm'];

////////////////////////////////////////////////////////////////////
class App {
    constructor(storage) {
        this.storage = storage;
        // Attach event listeners
        window.addEventListener('DOMContentLoaded', this.pageLoadEvent.bind(this));
        // createAccountBtn.addEventListener('click', this.checkRegistrationData.bind(this));
        signUpLink.addEventListener(
            'click',
            function () {
                this.hideForm(loginFormContainer);
                this.showForm(registerFormContainer);
            }.bind(this)
        );

        loginLink.addEventListener(
            'click',
            function () {
                this.showForm(loginFormContainer);
                this.hideForm(registerFormContainer);
            }.bind(this)
        );

        registerFormContainer.addEventListener('submit', this.addUser.bind(this));
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
        this.hideForm(loginFormContainer);
        this.showForm(registerFormContainer);
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
        if (user.userName !== '' && user.password !== '') {
            this.storage.storeUser(user);
        }
    }

    checkLoginData() {
        const storedUserData = this.storage.getUsers();
        const email = storedUserData[loginUserName.value];
        const password = storedUserData[loginUserName.value].password;

        if (email && password === loginPassword.value) {
            alert('Welcome! You are logged in.');
            overlay.classList.add('overlay--hidden');
            this.hideForm(loginFormContainer);
        }
    }

    /*
    checkRegistrationData() {
        if (userName.checkValidity() && password.checkValidity()) {
            alert('Your account has been registered!');
            document.querySelector('form').reset();
            this.showForm(loginForm);
            this.hideForm(registerForm);
        }
    }
    */
}

export default App;

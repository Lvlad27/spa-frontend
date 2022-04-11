import User from './user.js';
import Storage from './storage.js';
import FormValidation from './formValidation.js';

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
        // this.loginFormValidation = loginFormValidation;
        // this.signUpFormValidation = signUpFormValidation;

        // Attach event listeners
        window.addEventListener('DOMContentLoaded', this.pageLoadEvent.bind(this));
        // createAccountBtn.addEventListener('click', this.checkRegistrationData.bind(this));
        // signUpLink.addEventListener(
        //     'click',
        //     this.toggleFormVisibility(loginFormContainer, registerFormContainer).bind(this)
        // );

        // loginLink.addEventListener(
        //     'click',
        //     this.toggleFormVisibility(loginFormContainer, registerFormContainer).bind(this)
        // );

        signUpLink.addEventListener(
            'click',
            this.toggleFormVisibility(loginFormContainer, registerFormContainer).bind(this)
        );

        loginLink.addEventListener(
            'click',
            this.toggleFormVisibility(registerFormContainer, loginFormContainer).bind(this)
        );

        registerFormContainer.addEventListener('submit', this.addUser.bind(this));
        loginBtn.addEventListener('click', this.checkLoginData.bind(this));
    }

    toggleFormVisibility(hidden, visible) {
        const hideform = e => {
            e.classList.add('hide-element');
        };

        const showForm = e => {
            e.classList.remove('hide-element');
        };

        hideform(hidden);
        showForm(visible);
    }

    pageLoadEvent() {
        overlay.classList.remove('overlay--hidden');
        this.toggleFormVisibility(loginFormContainer, registerFormContainer);
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
            // this.hideForm(loginFormContainer);
        }
    }

    // checkRegistrationData() {
    //     if (userName.checkValidity() && password.checkValidity()) {
    //         alert('Your account has been registered!');
    //         document.querySelector('form').reset();
    //         this.showForm(loginForm);
    //         this.hideForm(registerForm);
    //     }
    // }
}

export default App;

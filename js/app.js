import User from './User.js';
import Storage from './Storage.js';
import FormValidation from './FormValidation.js';
import UserInterface from './UserInterface.js';

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
    signUpFormInputs = ['signUpEmail', 'signUpPass', 'passwordConfirm'],
    userList = document.getElementById('userList');

////////////////////////////////////////////////////////////////////
class App {
    constructor(storage, loginFormValidation, signUpFormValidation, userInterface) {
        this.storage = storage;
        this.loginFormValidation = loginFormValidation;
        this.signUpFormValidation = signUpFormValidation;
        this.userInterface = userInterface;

        // Attach event listeners
        document.addEventListener('DOMContentLoaded', this.pageLoadEvent.bind(this));
        document.addEventListener('DOMContentLoaded', userInterface.displayUsers());
        createAccountBtn.addEventListener('click', this.checkRegistrationData.bind(this));

        /*
        signUpLink.addEventListener(
            'click',
            this.toggleFormVisibility(loginFormContainer, registerFormContainer).bind(this)
        );

        loginLink.addEventListener(
            'click',
            this.toggleFormVisibility(registerFormContainer, loginFormContainer).bind(this)
        );
        */

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
                this.hideForm(registerFormContainer);
                this.showForm(loginFormContainer);
            }.bind(this)
        );

        registerFormContainer.addEventListener('submit', this.addUser.bind(this));
        loginBtn.addEventListener('click', this.checkLoginData.bind(this));
    }

    /*
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
    */

    pageLoadEvent() {
        overlay.classList.remove('overlay--hidden');
        // this.toggleFormVisibility(loginFormContainer, registerFormContainer);
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

    hideForm(formName) {
        formName.classList.add('hide-element');
    }

    showForm(formName) {
        formName.classList.remove('hide-element');
    }

    addUser() {
        const user = new User(userName.value, password.value);

        if (this.signUpFormValidation.validateOnSubmit()) {
            this.userInterface.addUserToList(user);
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

    checkRegistrationData() {
        if (this.signUpFormValidation.validateOnSubmit()) {
            alert('Your account has been registered!');
            document.querySelector('form').reset();
            this.hideForm(registerFormContainer);
            this.showForm(loginFormContainer);
        }
    }
}

export default App;

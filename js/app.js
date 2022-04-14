import User from './User.js';
import Storage from './Storage.js';
import FormValidation from './FormValidation.js';
import UserInterface from './UserInterface.js';

////////////////////////////////////////////////////////////////////
export let id = id => document.getElementById(id);

export const loginFormContainer = id('loginAccount'),
    registerFormContainer = id('registerAccount'),
    userdataFormContainer = id('userdataContainer'),
    userdataForm = id('userdataForm'),
    userName = id('signUpEmail'),
    password = id('signUpPass'),
    passwordConfirm = id('passwordConfirm'),
    loginUserName = id('loginUserName'),
    loginPassword = id('loginPassword'),
    loginBtn = id('loginBtn'),
    signUpBtn = id('createAccountBtn'),
    submitUserdata = id('submit-userdata'),
    loginLink = id('loginLink'),
    signUpLink = id('signUpLink'),
    createAccountBtn = id('createAccountBtn'),
    overlay = id('overlay'),
    loginFormInputs = ['loginUserName', 'loginPassword'],
    signUpFormInputs = ['signUpEmail', 'signUpPass', 'passwordConfirm'],
    userDataFormInputs = ['name', 'surname', 'age', 'birthday', 'hobbies'],
    userTable = id('userTable'),
    userList = id('userList'),
    name = id('firstName'),
    surname = id('surname'),
    country = id('country'),
    birthday = id('birthday'),
    gender = document.querySelector('input[name=gender]:checked'),
    checkedHobbies = Array.from(document.querySelectorAll('input[name="prefer"]:checked'))
        .map(checkbox => checkbox.value)
        .toString();

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
        loginBtn.addEventListener('click', this.checkLoginData.bind(this));
        createAccountBtn.addEventListener('click', this.checkRegistrationData.bind(this));
        registerFormContainer.addEventListener('submit', this.addUser.bind(this));

        userdataForm.addEventListener('submit', function (e) {
            e.preventDefault();
        });
        userdataForm.addEventListener('submit', this.updateUserData.bind(this));

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

        userList.addEventListener(
            'click',
            function (e) {
                e.preventDefault();
                if (e.target.matches('button.edit-user')) {
                    this.showForm(userdataFormContainer);
                }
            }.bind(this)
        );
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
        // overlay.classList.remove('overlay--hidden');
        // this.toggleFormVisibility(loginFormContainer, registerFormContainer);
        this.hideForm(loginFormContainer);
        this.hideForm(userdataFormContainer);
        this.hideForm(userTable);
        // this.hideForm(registerFormContainer);
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

    readFromEditFormData() {}

    addUser() {
        const user = new User(
            userName.value,
            password.value,
            name.value,
            surname.value,
            country.value,
            birthday.value,
            gender.value,
            checkedHobbies
        );

        if (this.signUpFormValidation.validateOnSubmit()) {
            this.userInterface.addUserToList(user);
            this.storage.storeUser(user);
        }
    }

    updateUserData() {
        const storedUserData = this.storage.getUsers();

        const keysArray = Object.entries(storedUserData);
        console.log('keysArray', keysArray);

        /*
        const keysArray = Object.keys(storedUserData);



        keysArray.forEach(
            function (key) {
                let user = storedUserData[key];
                let userKeys = Object.keys(user);
                console.log('userKeys', userKeys);

                for (let i = 0; i <= keysArray; i++) {
                    console.log(user[0]);
                    // Object.assign(user, { name: name.value });
                }
            }.bind(this)
        );
        */
    }

    checkLoginData() {
        const storedUserData = this.storage.getUsers();
        const email = storedUserData[loginUserName.value];
        const password = storedUserData[loginUserName.value].password;

        if (email && password === loginPassword.value) {
            overlay.classList.add('overlay--hidden');
            this.hideForm(loginFormContainer);
            this.showForm(userTable);
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

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
    name = id('firstName'),
    surname = id('surname'),
    age = id('age'),
    birthday = id('birthday'),
    gender = ['male', 'female'],
    hobbies = ['Sports', 'Gaming', 'Arts & Crafts', 'Traveling & Outdoors'],
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
    userList = id('userList');

// if (tr.childNodes.tagName === 'button') console.log('button');

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
        userdataFormContainer.addEventListener('submit', this.updateUserData.bind(this));

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
        this.hideForm(registerFormContainer);
        const storedUserData = this.storage.getUsers();
        console.log(storedUserData);
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

    updateUserData(user) {
        const storedUserData = this.storage.getUsers();
        // console.log(storedUserData);

        const buttonArray = document.querySelectorAll('.edit-user');
        // const entries = Object.entries(storedUserData);

        // console.log(entries);

        // entries[0][1]['name'] = name.value;

        // this.storage.storeUser(storedUserData);

        // Return true If buttonArray and Object.keys(storedUserData) have same index number. If the condition is true, the submitted form will go to the corresponding user object.

        /*
        What is the problem I'm trying to solve?
        User needs to click on edit button. A form will show which he can complete and submit. The submitted data will be added to the corresponding user object and updated in storage. Also the form will show the new information.

        */

        // I have an index and 2 arrays.

        // const editCondition = () => {
        //     for (let i = 0; i <= buttonArray.length; i++) {
        //         for (let j = 0; j <= keys.length; j++) {
        //             if (i === j) {
        //                 return true;
        //             } else {
        //                 return false;
        //             }
        //         }
        //     }
        // };

        const keysArray = Object.keys(storedUserData);
        // console.log('keysArray', keysArray);

        // for (let i = 0; i < keysArray.length; i++) {
        //     let user = storedUserData[i];
        //     console.log('user', user);
        // }

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
    }

    checkLoginData() {
        const storedUserData = this.storage.getUsers();
        const email = storedUserData[loginUserName.value];
        const password = storedUserData[loginUserName.value].password;

        if (email && password === loginPassword.value) {
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

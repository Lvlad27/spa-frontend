import User from './User.js';

////////////////////////////////////////////////////////////////////
export let id = (id) => document.getElementById(id);

export let loginFormContainer = id('loginAccount'),
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
    userTable = id('userTable'),
    userList = id('userList'),
    name = id('firstName'),
    surname = id('surname'),
    country = id('country'),
    birthday = id('birthday'),
    gender = '',
    checkedHobbies = '';

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
        this.updateUserTableData();

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

        // userList.addEventListener(
        //     'click',
        //     function (e) {
        //         e.preventDefault();
        //         if (e.target.matches('button.edit-user')) {
        //             this.showForm(userdataFormContainer);
        //         }
        //     }.bind(this)
        // );
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
        this.showForm(userTable);
        this.hideForm(registerFormContainer);
        // console.log('usersArray', this.storage.getUsersArray());
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
        let user = new User(
            userName.value,
            password.value,
            firstName.value,
            surname.value,
            country.value,
            birthday.value,
            gender.value,
            checkedHobbies
        );

        if (this.signUpFormValidation.validateOnSubmit()) {
            this.userInterface.addUserToTable(user);
            this.storage.storeUser(user);
        }
    }

    updateUserTableData(storedUserData = this.storage.getUsers()) {
        let usersArray = this.storage.getUsersArray(),
            editUserButtons = [...document.getElementsByClassName('edit-user')];

        editUserButtons.forEach((button, buttonIndex) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.showForm(userdataFormContainer);
                usersArray.forEach((user, userIndex) => {
                    if (editUserButtons.indexOf(e.target) === userIndex) {
                        console.log(`You clicked on ${usersArray[userIndex].userName}`);

                        userdataFormContainer.addEventListener('submit', (e) => {
                            let firstName = id('firstName'),
                                surname = id('surname'),
                                country = id('country'),
                                birthday = id('birthday'),
                                checkedHobbies = Array.from(
                                    userdataForm.querySelectorAll('input[name="prefer"]:checked')
                                )
                                    .map((checkbox) => checkbox.value)
                                    .toString(),
                                gender = document.querySelector('input[name=gender]:checked');

                            user = new User(
                                usersArray[userIndex].userName,
                                usersArray[userIndex].password,
                                firstName.value,
                                surname.value,
                                country.value,
                                birthday.value,
                                gender.value,
                                checkedHobbies
                            );
                            this.storage.storeUser(user);
                            console.log(user);
                            // usersArray[userIndex].firstName = name.value;
                            // usersArray[userIndex].surname = surname.value;
                            // usersArray[userIndex].country = country.value;
                            // usersArray[userIndex].birthday = birthday.value;
                            // usersArray[userIndex].gender = gender.value;

                            // let user = new User(
                            //     userName.value,
                            //     password.value,
                            //     firstName.value,
                            //     surname.value,
                            //     country.value,
                            //     birthday.value,
                            //     gender.value,
                            //     checkedHobbies
                            // );

                            usersArray[userIndex].hobbies = checkedHobbies;

                            this.storage.storeUser(user);
                        });
                    }
                });
            });
        });
    }

    checkLoginData() {
        let storedUserData = this.storage.getUsers(),
            email = storedUserData[loginUserName.value],
            password = storedUserData[loginUserName.value].password;

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

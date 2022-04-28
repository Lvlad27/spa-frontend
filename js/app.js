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
    gender = document.querySelector('input[name=gender]:checked'),
    checkedHobbies = '',
    logoLink = id('logoLink');
// console.log('URL is ', location.href);
// console.log('Host is ', location.hostname);
// console.log('Pathname is ', location.pathname);
// console.log('Protocol is ', location.protocol);
// console.log('Port name is ', location.port);
// location.assign('https://www.google.ro/');

////////////////////////////////////////////////////////////////////
class App {
    constructor(storage, loginFormValidation, signUpFormValidation, userInterface) {
        this.storage = storage;
        this.loginFormValidation = loginFormValidation;
        this.signUpFormValidation = signUpFormValidation;
        this.userInterface = userInterface;

        // Event listeners
        document.addEventListener('DOMContentLoaded', this._pageLoad.bind(this));
        document.addEventListener('click', this.sidebarUserTableBtn.bind(this));
        document.addEventListener('click', this.sidebarHomeBtn.bind(this));
        document.addEventListener('click', this.sidebarLogoutBtn.bind(this));
        document.addEventListener('click', this.signUpLink.bind(this));
        document.addEventListener('click', this.loginLink.bind(this));
        document.addEventListener('submit', this.registrationForm.bind(this));
        document.addEventListener('click', this.createAccountBtn.bind(this));
        document.addEventListener('click', this.loginBtn.bind(this));
        document.addEventListener('hashchange', this.window.bind(this));

        this.updateUserTableData();
    }

    window(event) {
        if (event.target.matches('window')) {
            this._onRouteChange();
        }
    }

    sidebarUserTableBtn(event) {
        if (event.target.matches('#sidebarUserTableBtn')) {
            this.animateFadeIn(userTable);
            this.showForm(userTable);
        }
    }

    sidebarHomeBtn(event) {
        if (event.target.matches('#sidebarHomeBtn')) {
            this.hideForm(userTable);
        }
    }

    sidebarLogoutBtn(event) {
        if (event.target.matches('#sidebarLogoutBtn')) {
            this._logOut();
        }
    }

    signUpLink(event) {
        if (event.target.matches('#signUpLink')) {
            this.animateFadeOut(loginFormContainer);
            this.hideForm(loginFormContainer);
            this.animateFadeIn(registerFormContainer);
            this.showForm(registerFormContainer);
        }
    }

    loginLink(event) {
        if (event.target.matches('#loginLink')) {
            this.animateFadeOut(registerFormContainer);
            this.hideForm(registerFormContainer);
            this.animateFadeIn(loginFormContainer);
            this.showForm(loginFormContainer);
        }
    }

    animateFadeIn(element) {
        element.classList.remove('FadeOut');
        element.classList.add('FadeIn');
    }

    animateFadeOut(element) {
        element.classList.remove('FadeIn');
        element.classList.add('FadeOut');
    }

    hideForm(formName) {
        formName.classList.add('hide-element');
    }

    showForm(formName) {
        formName.classList.remove('hide-element');
    }

    registrationForm(event) {
        if (event.target.matches('#registerAccount')) {
            this._addUser();
        }
    }

    createAccountBtn(event) {
        if (event.target.matches('#createAccountBtn')) {
            this._checkRegistrationData();
        }
    }

    loginBtn(event) {
        if (event.target.matches('#loginBtn')) {
            event.preventDefault();
            this._checkLoginData();
        }
    }

    _pageLoad() {
        overlay.classList.remove('overlay--hidden');
        this.animateFadeIn(loginFormContainer);
        this.showForm(loginFormContainer);

        if (this.storage.getLoggedUser() !== null) {
            overlay.classList.add('overlay--hidden');
            this.hideForm(loginFormContainer);
        }
    }

    _addUser() {
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

    _checkLoginData() {
        let storedUserData = this.storage.getUsers(),
            email = storedUserData[loginUserName.value],
            password = storedUserData[loginUserName.value].password;

        if (email && password === loginPassword.value) {
            // this.onRouteChange();
            let loggedUser = email;
            this.storage.saveUserSession(loggedUser);

            overlay.classList.add('overlay--hidden');
            this.hideForm(loginFormContainer);

            let message = id('welcomeMessage');
            message.innerHTML = `Welcome \n
            ${loginUserName.value}!`;
            this.animateFadeIn(message);
            this.showForm(message);
            // return true;
        } else {
            alert('Wrong password!');
            console.log('false');
        }
    }

    _checkRegistrationData() {
        if (this.signUpFormValidation.validateOnSubmit()) {
            alert('Your account has been registered!');
            document.querySelector('form').reset();
            this.hideForm(registerFormContainer);
            this.animateFadeIn(loginFormContainer);
            this.showForm(loginFormContainer);
        }
    }

    _fillFormData(rowArray) {
        let hobbiesArr = Array.from(userdataForm.querySelectorAll('input[name="prefer"]'));
        let hobbies = rowArray[7].innerHTML.split(',');
        gender = document.getElementsByName('gender');

        name.value = rowArray[2].innerHTML;
        surname.value = rowArray[3].innerHTML;
        country.value = rowArray[4].innerHTML;
        birthday.value = rowArray[5].innerHTML;

        gender.forEach((input) => {
            if (input.value === rowArray[6].innerHTML) {
                input.checked = true;
            }
        });

        hobbiesArr.forEach((input1) => {
            hobbies.forEach((input2) => {
                if (input1.value === input2) {
                    input1.checked = true;
                }
            });
        });
    }

    _readUpdateUserFormData() {
        let formData = {
            firstName: document.getElementById('firstName').value,
            surname: document.getElementById('surname').value,
            country: document.getElementById('country').value,
            birthday: document.getElementById('birthday').value,
            gender: document.querySelector('input[name=gender]:checked').value,
            hobbies: Array.from(userdataForm.querySelectorAll('input[name="prefer"]:checked'))
                .map((checkbox) => checkbox.value)
                .toString(),
        };

        return formData;
    }

    updateUserTableData() {
        this.userInterface.displayUsers();
        let editUserButtons = [...document.getElementsByClassName('edit-user')];

        const insertRecord = (rowArray, data) => {
            rowArray[2].innerHTML = data.firstName;
            rowArray[3].innerHTML = data.surname;
            rowArray[4].innerHTML = data.country;
            rowArray[5].innerHTML = data.birthday;
            rowArray[6].innerHTML = data.gender;
            rowArray[7].innerHTML = data.hobbies;
        };

        const checkIfButton = (element) => {
            if (element.matches('a.edit-user')) {
                this.animateFadeIn(userdataFormContainer);
                this.showForm(userdataFormContainer);
                return true;
            }
        };

        // TODO separate event listeners
        const onFormSubmit = () => {
            document.addEventListener('click', (e) => {
                if (checkIfButton(e.target)) {
                    let currRowArray = [...e.target.parentElement.parentElement.children];
                    let currentUser =
                        e.target.parentElement.parentElement.firstElementChild.innerHTML;
                    let data = this.readUpdateUserFormData();
                    this.fillFormData(currRowArray);

                    location.href = `#${currentUser}`;

                    submitUserdata.addEventListener('click', (e) => {
                        e.preventDefault();
                        let formData = this._readUpdateUserFormData();
                        insertRecord(currRowArray, formData);
                        this.hideForm(userdataFormContainer);
                        this.storage.updateUser(currentUser, formData);
                    });
                }
            });
        };

        onFormSubmit();
    }

    saveUpdatedFormData() {
        let user = this.storage.getLoggedUser();
        let data = this.readUpdateUserFormData();
        let savedFormData = Object.assign(data, user);
        return savedFormData;
    }

    _logOut() {
        this.storage.deleteUserSession();
    }

    _onRouteChange() {
        let hash = location.hash;

        switch (hash) {
            case '#updateUserDataForm':
                //
                break;

            case '#usertable':
                //
                break;
        }
    }
}

export default App;

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
    emailInput = id('emailInput'),
    passwordInput = id('passwordInput'),
    name = id('firstName'),
    surname = id('surname'),
    country = id('country'),
    birthday = id('birthday'),
    gender = document.querySelector('input[name=gender]:checked'),
    checkedHobbies = '',
    logoLink = id('logoLink');

////////////////////////////////////////////////////////////////////
class App {
    constructor(storage, loginFormValidation, signUpFormValidation, userInterface) {
        this.storage = storage;
        this.loginFormValidation = loginFormValidation;
        this.signUpFormValidation = signUpFormValidation;
        this.userInterface = userInterface;

        document.addEventListener('DOMContentLoaded', this._pageLoad.bind(this));
        document.addEventListener('click', this.sidebarUserTableBtn.bind(this));
        document.addEventListener('click', this.sidebarHomeBtn.bind(this));
        document.addEventListener('click', this.sidebarLogoutBtn.bind(this));
        document.addEventListener('click', this.signUpLink.bind(this));
        document.addEventListener('click', this.loginLink.bind(this));
        document.addEventListener('submit', this.registrationForm.bind(this));
        document.addEventListener('click', this.createAccountBtn.bind(this));
        document.addEventListener('click', this.loginBtn.bind(this));
        document.addEventListener('click', this.editUserBtn.bind(this));
        document.addEventListener('click', this.updateUserDataBtn.bind(this));
        document.addEventListener('click', this.cancelUserDataBtn.bind(this));
    }

    ////////////////////////////////////////////////
    // EVENT FUNCTIONS
    window(event) {
        if (event.target.matches('window')) {
            this._onRouteChange();
        }
    }

    sidebarUserTableBtn(event) {
        if (event.target.matches('#sidebarUserTableBtn')) {
            this.animateFadeIn(userTable);
            this.showForm(userTable);
            this.hideForm(userdataFormContainer);

            // TODO check to only show once if clicked multiple times
        }
    }

    sidebarHomeBtn(event) {
        if (event.target.matches('#sidebarHomeBtn')) {
            this.hideForm(userTable);
            this.hideForm(userdataFormContainer);
            userdataForm.reset();
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
            this._addUser();
        }
    }

    loginBtn(event) {
        if (event.target.matches('#loginBtn')) {
            event.preventDefault();
            this._checkLoginData();
        }
    }

    editUserBtn(event) {
        if (event.target.matches('a.edit-user')) {
            let editUserBtn = event.target,
                currRowArray = [...editUserBtn.parentElement.parentElement.children];
            // currUser = event.target.parentElement.parentElement.firstElementChild.innerHTML;
            this.animateFadeIn(userdataFormContainer);
            this.showForm(userdataFormContainer);
            this.hideForm(userTable);

            this._fillFormData(currRowArray);
        }
    }

    updateUserDataBtn(event) {
        if (event.target.matches('#submit-userdata')) {
            event.preventDefault();
            this._updateUser();
        }
    }

    cancelUserDataBtn(event) {
        if (event.target.matches('#cancel-userdata')) {
            this.hideForm(userdataFormContainer);
            userdataForm.reset();
            this.showForm(userTable);
        }
    }

    ////////////////////////////////////////////////
    // METHODS
    _updateUser() {
        let tdArr = document.querySelectorAll('[data-email]');
        tdArr.forEach((td) => {
            if (emailInput.value === td.innerHTML) {
                let currRowArr = td.parentElement.children;
                let formData = this._readUpdateUserFormData();
                this._insertRecord(currRowArr, formData);
                this.storage.updateUser(emailInput.value, formData);
                userdataForm.reset();
            }
        });
        this.hideForm(userdataFormContainer);
        this.showForm(userTable);
    }

    _welcomeMessage(user) {
        let message = id('welcomeMessage');
        message.innerHTML = `Welcome \n
            ${user}!`;
        this.animateFadeIn(message);
        this.showForm(message);
    }

    _pageLoad() {
        overlay.classList.remove('overlay--hidden');
        this.animateFadeIn(loginFormContainer);
        this.showForm(loginFormContainer);
        this.userInterface.displayUsers();

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
            this.storage.saveUserSession(email);
            let loggedUser = this.storage.getLoggedUser();
            this._welcomeMessage(loggedUser.userName);

            overlay.classList.add('overlay--hidden');
            this.hideForm(loginFormContainer);

            return true;
        } else {
            alert('Wrong password!');
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

    _readUpdateUserFormData() {
        let formData = {
            email: document.getElementById('emailInput').value,
            password: document.getElementById('passwordInput').value,
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

    _insertRecord(rowArray, data) {
        rowArray[0].innerHTML = data.email;
        rowArray[1].innerHTML = data.password;
        rowArray[2].innerHTML = data.firstName;
        rowArray[3].innerHTML = data.surname;
        rowArray[4].innerHTML = data.country;
        rowArray[5].innerHTML = data.birthday;
        rowArray[6].innerHTML = data.gender;
        rowArray[7].innerHTML = data.hobbies;
    }

    _fillFormData(rowArray) {
        let hobbiesArr = Array.from(userdataForm.querySelectorAll('input[name="prefer"]'));
        let hobbies = rowArray[7].innerHTML.split(',');
        gender = document.getElementsByName('gender');

        emailInput.value = rowArray[0].innerHTML;
        passwordInput.value = rowArray[1].innerHTML;
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

    _logOut() {
        this.storage.deleteUserSession();
    }
}

export default App;

////////////////////////////////////////////////////////////////////
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
        document.addEventListener('click', this.editUserBtn.bind(this));
        document.addEventListener('click', this.updateUserDataBtn.bind(this));
        document.addEventListener('click', this.cancelUserDataBtn.bind(this));
    }

    ////////////////////////////////////////////////
    // EVENT FUNCTIONS
    sidebarUserTableBtn(event) {
        if (event.target.matches('#sidebarUserTableBtn')) {
            this.animateFadeIn(userTable);
            this.showForm(userTable);
            this.hideForm(userdataFormContainer);
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

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
    sidebarUserTableBtn = id('sidebarUserTableBtn'),
    sidebarHomeBtn = id('sidebarHomeBtn'),
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
        // document.addEventListener('DOMContentLoaded', userInterface.displayUsers());
        // document.addEventListener('DOMContentLoaded', this.pageLoadEvent.bind(this));
        createAccountBtn.addEventListener('click', this.checkRegistrationData.bind(this));
        registerFormContainer.addEventListener('submit', this.addUser.bind(this));
        this.checkLoginData();
        this.updateUserTableData();
        this.signUpLinkOnClick();
        this.loginLinkOnClick();
        this.sidebarUserTableBtnOnClick();
        this.sidebarHomeBtnOnClick();
    }

    pageLoadEvent() {
        overlay.classList.remove('overlay--hidden');
        this.animateFadeIn(loginFormContainer);
        this.showForm(loginFormContainer);
    }

    sidebarUserTableBtnOnClick() {
        sidebarUserTableBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.animateFadeIn(userTable);
            this.showForm(userTable);
        });
    }

    sidebarHomeBtnOnClick() {
        sidebarHomeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideForm(userTable);
        });
    }

    signUpLinkOnClick() {
        signUpLink.addEventListener(
            'click',

            function () {
                this.animateFadeOut(loginFormContainer);
                this.hideForm(loginFormContainer);
                this.animateFadeIn(registerFormContainer);
                this.showForm(registerFormContainer);
            }.bind(this)
        );
    }

    loginLinkOnClick() {
        loginLink.addEventListener(
            'click',

            function () {
                this.animateFadeOut(registerFormContainer);
                this.hideForm(registerFormContainer);
                this.animateFadeIn(loginFormContainer);
                this.showForm(loginFormContainer);
            }.bind(this)
        );
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

    getAllSiblings(e) {
        // for collecting siblings
        let siblings = [];
        // if no parent, return no sibling
        if (!e.parentNode) {
            return siblings;
        }
        // first child of the parent node
        let sibling = e.parentNode.firstChild;

        // collecting siblings
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== e) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
        }
        return siblings;
    }

    updateUserTableData() {
        this.userInterface.displayUsers();
        let editUserButtons = [...document.getElementsByClassName('edit-user')];

        const checkIfButton = (element) => {
            if (element.matches('button.edit-user')) {
                this.animateFadeIn(userdataFormContainer);
                this.showForm(userdataFormContainer);

                return true;
            }
        };

        userList.addEventListener('click', (e) => {
            e.preventDefault();
            if (checkIfButton(e.target)) {
                let currentUser = e.target.parentElement.parentElement.firstElementChild.innerHTML;
                console.log(currentUser);

                submitUserdata.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.hideForm(userdataFormContainer);
                    this.storage.updateUser(currentUser);
                });
            }
        });
    }

    checkLoginData() {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let storedUserData = this.storage.getUsers(),
                email = storedUserData[loginUserName.value],
                password = storedUserData[loginUserName.value].password;

            if (email && password === loginPassword.value) {
                overlay.classList.add('overlay--hidden');
                this.hideForm(loginFormContainer);
            }
        });
    }

    checkRegistrationData() {
        if (this.signUpFormValidation.validateOnSubmit()) {
            alert('Your account has been registered!');
            document.querySelector('form').reset();
            this.hideForm(registerFormContainer);
            this.animateFadeIn(loginFormContainer);
            this.showForm(loginFormContainer);
        }
    }
}

export default App;

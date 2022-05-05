import BaseView from './BaseView.js';
import User from '../User.js';

class SignUpFormView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('SignUpFormView');

        // document.addEventListener('click', this.loginLink.bind(this));
        // document.addEventListener('submit', this.registrationForm.bind(this));
        // document.addEventListener('click', this.createAccountBtn.bind(this));
    }

    getData(param) {
        return {};
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

    loginLink(event) {
        if (event.target.matches('#loginLink')) {
            this.animateFadeOut(registerFormContainer);
            this.hideForm(registerFormContainer);
            this.animateFadeIn(loginFormContainer);
            this.showForm(loginFormContainer);
        }
    }

    checkRegistrationData() {
        if (this.signUpFormValidation.validateOnSubmit()) {
            alert('Your account has been registered!');
            document.querySelector('form').reset();
        }
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
}

export default SignUpFormView;

/*

*/

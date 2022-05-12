import BaseFormView from './BaseFormView.js';

class SignUpFormView extends BaseFormView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('SignUpFormView');

        document.addEventListener('click', this.$createAccountBtn.bind(this));
    }

    getData(param) {
        return {};
    }

    $createAccountBtn(event) {
        if (event.target.matches('#createAccountBtn')) {
            const registerFormContainer = document.getElementById('signUpForm');
            const userName = document.getElementById('signUpEmail').value.trim();
            const password = document.getElementById('signUpPass').value.trim();

            const inputs = signUpForm.querySelectorAll('input');

            this.DataService.storeUser(userName, password);
            window.router.goTo('#userlist');
        }
    }

    checkRegistrationData() {
        if (this.signUpFormValidation.validateOnSubmit()) {
            alert('Your account has been registered!');
            document.querySelector('form').reset();
        }
    }

    readUpdateUserFormData() {
        const userdataForm = document.getElementById('userdataForm');
        let formData = {
            email: document.getElementById('emailInput').value.trim(),
            password: document.getElementById('passwordInput').value.trim(),
            firstName: document.getElementById('firstName').value.trim(),
            surname: document.getElementById('surname').value.trim(),
            country: document.getElementById('country').value.trim(),
            birthday: document.getElementById('birthday').value,
            gender: document.querySelector('input[name=gender]:checked').value,
            hobbies: Array.from(userdataForm.querySelectorAll('input[name="prefer"]:checked'))
                .map((checkbox) => checkbox.value)
                .toString(),
        };

        return formData;
    }
}

export default SignUpFormView;

/*

*/

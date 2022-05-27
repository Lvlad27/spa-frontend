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
            const email = document.getElementById('signUpEmail').value;
            const password = document.getElementById('signUpPass').value;

            const user = {
                email: email,
                password: password,
                firstName: '',
                surname: '',
                country: '',
                birthday: '',
                gender: '',
                hobbies: '',
                profileImgName: '',
            };

            this.DataService.storeUser(user);
            window.router.goTo('#login');
        }
    }
}

export default SignUpFormView;

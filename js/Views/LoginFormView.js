import BaseFormView from './BaseFormView.js';

class LoginFormView extends BaseFormView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('LoginFormView');

        document.addEventListener('click', this.$loginBtn.bind(this));
    }

    $loginBtn(event) {
        if (event.target.matches('#loginBtn')) {
            event.preventDefault();
            this.checkLogin();
        }
    }

    getData() {
        return {};
    }

    checkLogin() {
        const formInputs = ['loginUserName', 'loginPassword'];
        if (this.DataService.checkLogin()) {
            console.log('checkLogin');
            window.router.goTo('#home');
            return true;
        } else {
            // alert('Wrong username or password!');
            return false;
        }
    }

    // validateOnEntry() {
    //     this.formInputs.forEach((index) => {
    //         let input = document.querySelector(`#${index}`);
    //         input.addEventListener(
    //             'input',
    //             function () {
    //                 this.validateRegistrationInputs(input);
    //             }.bind(this)
    //         );
    //     });
    // }
}

export default LoginFormView;

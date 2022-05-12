import BaseFormView from './BaseFormView.js';

class LoginFormView extends BaseFormView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('LoginFormView');

        document.addEventListener('click', this.$loginBtn.bind(this));
    }

    getData() {
        return {};
    }

    $loginBtn(event) {
        if (event.target.matches('#loginBtn')) {
            event.preventDefault();
            this.checkLogin();
        }
    }

    checkLogin() {
        const formInputs = ['loginUserName', 'loginPassword'];
        if (this.DataService.checkLogin()) {
            console.log('checkLogin');
            window.router.goTo('#userlist');
            return true;
        } else {
            // alert('Wrong username or password!');
            return false;
        }
    }
}

export default LoginFormView;

import BaseView from './BaseView.js';

const overlay = document.getElementById('overlay');

class LoginFormView extends BaseView {
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
        if (this.DataService.checkLogin()) {
            window.router.goTo('#home');
            return true;
        } else {
            return false;
        }
    }
}

export default LoginFormView;

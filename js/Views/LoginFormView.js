import BaseView from './BaseView.js';

class LoginFormView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('LoginFormView');

        document.addEventListener('click', this.loginBtn.bind(this));
    }

    getData() {
        return {};
    }

    loginBtn(event) {
        if (event.target.matches('#loginBtn')) {
            event.preventDefault();
            console.log('this.DataService', this.DataService);
            if (this.DataService.checkLogin() || this.DataService.isUserLoggedIn()) {
                window.router.goTo('#home');
            }
        }
    }
}

export default LoginFormView;

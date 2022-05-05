import BaseView from './BaseView.js';

class LoginFormView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('LoginFormView');
    }

    getData() {
        return {};
    }

    checkLogin() {}
}

export default LoginFormView;

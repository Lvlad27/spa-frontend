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
            this.login();
        }
    }

    async checkLogin() {
        const loginUserName = document.getElementById('loginUserName').value,
            loginPassword = document.getElementById('loginPassword').value;
        const userArray = await this.DataService.getUsers();
        const allUserNames = userArray.map((user) => user.email);
        const allUserPasswords = userArray.map((user) => user.password);

        if (allUserNames.includes(loginUserName) && allUserPasswords.includes(loginPassword)) {
            await this.DataService._saveUserSession(loginUserName);
            return true;
        } else {
            alert('Please sign up before logging in!');
            return false;
        }
    }

    async login() {
        if (await this.checkLogin()) {
            window.router.goTo('#userlist');
            return true;
        } else {
            alert('Wrong username or password!');
            return false;
        }
    }
}

export default LoginFormView;

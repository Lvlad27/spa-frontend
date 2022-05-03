import BaseView from './BaseView.js';
import { loginFormContainer } from '../helpers.js';

class LoginFormView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('LoginFormView');
    }

    addEventListeners() {
        document.addEventListener('DOMContentLoaded', this.$pageLoad);
        document.addEventListener('click', this.$signUpLink);
        document.addEventListener('click', this.$loginBtn);
    }

    getData() {
        return this.DataService.getUsers();
    }

    render(data) {
        const templateHTML = this.template.innerHTML;
        return templateHTML;
    }

    getElement(param) {
        const html = this.render();
        return html;
    }

    afterRender() {
        overlay.classList.remove('overlay--hidden');
        fadeIn(loginFormContainer);
        show(loginFormContainer);
    }

    $signUpLink(event) {
        if (event.target.matches('#signUpLink')) {
            this.animateFadeOut(loginFormContainer);
            this.hideForm(loginFormContainer);
            this.animateFadeIn(registerFormContainer);
            this.showForm(registerFormContainer);
        }
    }

    $loginBtn(event) {
        if (event.target.matches('#loginBtn')) {
            event.preventDefault();
            this._checkLoginData();
        }
    }

    $pageLoad() {
        // this.userInterface.displayUsers();

        if (this.DataService.getLoggedUser() !== null) {
            overlay.classList.add('overlay--hidden');
            hide(loginFormContainer);
        }
    }

    /*
    $welcomeMessage(user) {
        let message = id('welcomeMessage');
        message.innerHTML = `Welcome \n
            ${user}!`;
        fadeIn(message);
        show(message);
    }
    */

    $checkLoginData() {
        let storedUserData = this.getData(),
            email = storedUserData[loginUserName.value],
            password = storedUserData[loginUserName.value].password;

        if (email && password === loginPassword.value) {
            DataService.saveUserSession(email);
            let loggedUser = DataService.getLoggedUser();
            welcomeMessage(loggedUser.userName);
            overlay.classList.add('overlay--hidden');
            hide(loginFormContainer);
        } else {
            alert('Wrong password!');
        }
    }
}

export default LoginFormView;

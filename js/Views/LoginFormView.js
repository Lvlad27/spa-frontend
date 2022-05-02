import BaseView from './BaseView.js';
import { loginFormContainer } from '../helpers.js';

class LoginFormView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('LoginFormView');

        // document.addEventListener('DOMContentLoaded', this.pageLoad.bind(this));
    }

    getData() {
        return {};
    }

    render() {
        const templateHTML = this.template.innerHTML;
        return templateHTML;
    }

    getElement() {
        const html = this.render();
        return html;
    }

    // pageLoad() {
    //     overlay.classList.remove('overlay--hidden');
    //     // animateFadeIn(loginFormContainer);
    //     // showForm(loginFormContainer);
    //     // this.userInterface.displayUsers();

    //     if (this.DataService.getLoggedUser() !== null) {
    //         overlay.classList.add('overlay--hidden');
    //         // hideForm(loginFormContainer);
    //     }
    // }

    /*
    welcomeMessage(user) {
        let message = id('welcomeMessage');
        message.innerHTML = `Welcome \n
            ${user}!`;
        animateFadeIn(message);
        showForm(message);
    }
    */

    /*
    checkLoginData() {
        let storedUserData = this.getData(),
            email = storedUserData[loginUserName.value],
            password = storedUserData[loginUserName.value].password;

        if (email && password === loginPassword.value) {
            DataService.saveUserSession(email);
            let loggedUser = DataService.getLoggedUser();
            welcomeMessage(loggedUser.userName);

            overlay.classList.add('overlay--hidden');
            hideForm(loginFormContainer);
        } else {
            alert('Wrong password!');
        }
    }
    */
}

export default LoginFormView;

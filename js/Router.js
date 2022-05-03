import DataService from './DataService.js';
import { templateRenderer } from './helpers.js';
import LoginFormView from './Views/LoginFormView.js';
import SignUpFormView from './Views/SignUpFormView.js';
import UserListView from './Views/UserListView.js';
import UserFormView from './Views/UserFormView.js';

const loginFormView = new LoginFormView(DataService, templateRenderer),
    signUpFormView = new SignUpFormView(DataService, templateRenderer),
    userListView = new UserListView(DataService, templateRenderer),
    userFormView = new UserFormView(DataService, templateRenderer);

class Router {
    constructor() {
        this.router = {
            '#login': {
                component: loginFormView,
                isProtected: false,
            },
            '#signUp': {
                component: signUpFormView,
                isProtected: false,
            },
            '#userList': {
                component: userListView,
                isProtected: true,
            },
            '': {
                component: loginFormView,
                isProtected: false,
            },
        };

        this.onHashChange();
        this.switchView(loginFormView);
    }

    onHashChange() {
        const route = location.hash.split('/')[0];
        const component = this.router[route];

        if (component.isProtected && !DataService.isUserLoggedIn()) {
            this.goTo('#login');
        }

        if (route === '') {
            this.goTo('#login');
        }
    }

    switchView(component, param) {
        const element = component.getElement(param);
        document.getElementById('loginAccount').innerHTML = element;
        this.previousView = component;
        console.log('switchView() called');
    }

    goTo(hash) {
        location.hash = hash;
        console.log('goTo() called');
    }
}

export default Router;

// document.addEventListener('DOMContentLoaded', window);
// window.addEventListener('DOMContentLoaded', switchView('#login'));
// document.addEventListener('hashchange', onHashChange);

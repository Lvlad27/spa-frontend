import DataService from './DataService.js';
import { templateRenderer, id } from './helpers.js';
import LoginFormView from './Views/LoginFormView.js';
import SignUpFormView from './Views/SignUpFormView.js';
import UserListView from './Views/UserListView.js';
import UserFormView from './Views/UserFormView.js';

const loginFormView = new LoginFormView(DataService, templateRenderer),
    signUpFormView = new SignUpFormView(DataService, templateRenderer),
    userListView = new UserListView(DataService, templateRenderer),
    userFormView = new UserFormView(DataService, templateRenderer),
    dataService = new DataService();

const main = id('main'),
    userListContainer = id('sectionContentContainer');

const overlay = id('overlay');

class Router {
    constructor() {
        this.router = {
            '': {
                component: {
                    name: loginFormView,
                    container: main,
                },
                isProtected: false,
            },
            '#login': {
                component: {
                    name: loginFormView,
                    container: main,
                },
                isProtected: false,
            },
            '#signup': {
                component: {
                    name: signUpFormView,
                    container: main,
                },
                isProtected: false,
            },
            '#userlist': {
                component: {
                    name: userListView,
                    container: userListContainer,
                },
                isProtected: true,
            },
            '#userform': {
                component: userFormView,
                isProtected: true,
            },
        };

        this.log();
        this.onHashChange();
        window.addEventListener('hashchange', this.onHashChange.bind(this));
    }

    log() {
        console.log('console.log');
    }

    onHashChange() {
        const url = location.hash.split('/')[0],
            route = this.router[url],
            component = route.component.name,
            container = route.component.container;

        if (url.isProtected && !dataService.isUserLoggedIn()) {
            this.goTo('#login');
        } else {
            this.switchView(component, container);
        }

        if (location.hash === '#signup') {
            const loginFormContainer = id('loginAccount');
            if (loginFormContainer) {
                this.deleteView(loginFormContainer);
            }
        }

        if (location.hash === '#login') {
            const registerFormContainer = id('registerAccount');
            if (registerFormContainer) {
                this.deleteView(registerFormContainer);
            }
        }

        if (this.checkLoginView()) {
            dataService.saveUserSession(loginUserName);
            let loggedUser = dataService.getLoggedUser();
            overlay.classList.add('overlay--hidden');
        }
    }

    switchView(component, container, param) {
        const element = component.getElement(param);
        container.innerHTML += element;
        previousView = component;
        // component.afterRender();
    }

    deleteView(container) {
        container.remove();
    }

    goTo(hash) {
        location.hash = hash;
    }
}

export default Router;

// document.addEventListener('DOMContentLoaded', window);
// window.addEventListener('DOMContentLoaded', switchView('#login'));
// document.addEventListener('hashchange', onHashChange);

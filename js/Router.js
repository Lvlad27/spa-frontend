import DataService from './DataService.js';
import { templateRenderer, id } from './helpers.js';
import NavbarView from './Views/NavbarView.js';
import LoginFormView from './Views/LoginFormView.js';
import SignUpFormView from './Views/SignUpFormView.js';
import UserListView from './Views/UserListView.js';
import UserFormView from './Views/UserFormView.js';

const navbarView = new NavbarView(DataService, templateRenderer),
    loginFormView = new LoginFormView(DataService, templateRenderer),
    signUpFormView = new SignUpFormView(DataService, templateRenderer),
    userListView = new UserListView(DataService, templateRenderer),
    userFormView = new UserFormView(DataService, templateRenderer),
    dataService = new DataService();

const main = id('main'),
    contentContainer = id('sectionContent'),
    menuContainer = id('sectionMenu');

const overlay = document.getElementById('overlay');

class Router {
    constructor() {
        this.router = {
            '': {
                component: {
                    name: loginFormView,
                    container: main,
                },
                isProtected: true,
            },
            '#home': {
                component: {
                    name: navbarView,
                    container: menuContainer,
                },
                isProtected: true,
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
                    container: contentContainer,
                },
                isProtected: true,
            },
            '#userform': {
                component: userFormView,
                isProtected: true,
            },
        };

        this.onHashChange();
        window.addEventListener('hashchange', this.onHashChange.bind(this));
    }

    onHashChange() {
        const url = location.hash.split('/')[0],
            route = this.router[url],
            component = route.component.name,
            container = route.component.container;

        if (route.isProtected) {
            this.goTo('#login');
            this.switchView(component, container);
        } else {
            this.switchView(component, container);
        }
    }

    switchView(component, container, param) {
        const element = component.getElement(param);
        container.innerHTML += element;
        // component.afterRender();
    }

    // deleteView(container) {
    //     container.remove();
    // }

    goTo(hash) {
        location.hash = hash;
    }
}

export default Router;

// document.addEventListener('DOMContentLoaded', window);
// window.addEventListener('DOMContentLoaded', switchView('#login'));
// document.addEventListener('hashchange', onHashChange);

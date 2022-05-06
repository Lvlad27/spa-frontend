import { templateRenderer, id } from './helpers.js';
import DataService from './DataService.js';
import HomeView from './Views/HomeView.js';
import LoginFormView from './Views/LoginFormView.js';
import SignUpFormView from './Views/SignUpFormView.js';
import UserListView from './Views/UserListView.js';
import UserFormView from './Views/UserFormView.js';

const dataService = new DataService(),
    homeView = new HomeView(dataService, templateRenderer),
    loginFormView = new LoginFormView(dataService, templateRenderer),
    signUpFormView = new SignUpFormView(dataService, templateRenderer),
    userListView = new UserListView(dataService, templateRenderer),
    userFormView = new UserFormView(dataService, templateRenderer);

const main = id('main'),
    body = id('body'),
    contentContainer = id('sectionContent'),
    menuContainer = id('sectionMenu');

class Router {
    constructor() {
        this.router = {
            '': {
                component: {
                    name: loginFormView,
                    container: body,
                },
                isProtected: true,
            },
            '#home': {
                component: {
                    name: homeView,
                    container: body,
                },
                isProtected: true,
            },
            '#login': {
                component: {
                    name: loginFormView,
                    container: body,
                },
                isProtected: false,
            },
            '#signup': {
                component: {
                    name: signUpFormView,
                    container: body,
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

        if (!dataService.isUserLoggedIn() && route.isProtected) {
            this.goTo('#login');
            this.switchView(component, container);
        } else {
            this.switchView(component, container);

            // if (component.layout === 'formLayout') {
            // }
        }
    }

    // formLayout() {
    //     const body = document.getElementById('body');
    //     body.innerHTML = homeView.getElement(param);
    // }

    // homeLayout() {
    //     const body = document.getElementById('body');
    //     body.innerHTML = homeView.getElement(param);
    // }

    switchView(component, container, param) {
        const element = component.getElement(param);
        container.innerHTML = element;
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

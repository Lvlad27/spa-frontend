import { templateRenderer } from './helpers.js';
import DataService from './DataService.js';
import HomeView from './Views/HomeView.js';
import NavView from './Views/NavView.js';
import LoginFormView from './Views/LoginFormView.js';
import SignUpFormView from './Views/SignUpFormView.js';
import UserListView from './Views/UserListView.js';
import UserFormView from './Views/UserFormView.js';
import Router from './Router.js';

const dataService = new DataService(),
    homeView = new HomeView(dataService, templateRenderer),
    navView = new NavView(dataService, templateRenderer),
    loginFormView = new LoginFormView(dataService, templateRenderer),
    signUpFormView = new SignUpFormView(dataService, templateRenderer),
    userListView = new UserListView(dataService, templateRenderer),
    userFormView = new UserFormView(dataService, templateRenderer);

const routes = {
    '': {
        component: loginFormView,
        isProtected: false,
    },
    '#home': {
        component: homeView,
        isProtected: true,
    },
    '#login': {
        component: loginFormView,
        isProtected: false,
    },
    '#signup': {
        component: signUpFormView,
        isProtected: false,
    },
};

const contentRoutes = {
    '#userlist': {
        component: userListView,
        isProtected: true,
    },
    '#userform': {
        component: userFormView,
        isProtected: true,
    },
};

const navRoutes = {
    '#home': {
        component: navView,
        isProtected: true,
    },
    '#userlist': {
        component: navView,
        isProtected: true,
    },
};

window.router = new Router({
    routes: routes,
    dataService: dataService,
    rootElement: 'body',
});

window.navRouter = new Router({
    routes: navRoutes,
    dataService: dataService,
    rootElement: 'sectionMenu',
});

window.contentRouter = new Router({
    routes: contentRoutes,
    dataService: dataService,
    rootElement: 'sectionContent',
});

import { templateRenderer } from './helpers.js';
import DataService from './DataService.js';

import HeaderView from './Views/HeaderView.js';
import LoginFormView from './Views/LoginFormView.js';
import SignUpFormView from './Views/SignUpFormView.js';
import UserListView from './Views/UserListView.js';
import UserFormView from './Views/UserFormView.js';

import Router from './Router.js';

const dataService = new DataService(),
    loginFormView = new LoginFormView(dataService, templateRenderer),
    signUpFormView = new SignUpFormView(dataService, templateRenderer),
    userListView = new UserListView(dataService, templateRenderer),
    userFormView = new UserFormView(dataService, templateRenderer),
    headerView = new HeaderView(dataService, templateRenderer);

const routes = {
    '': {
        component: loginFormView,
        isProtected: false,
    },
    '#login': {
        component: loginFormView,
        isProtected: false,
    },
    '#signup': {
        component: signUpFormView,
        isProtected: false,
    },
    '#userlist': {
        component: userListView,
        isProtected: true,
    },
    '#users': {
        component: userFormView,
        isProtected: true,
    },
};

const headerRoutes = {
    '#userlist': {
        component: headerView,
        isProtected: true,
    },
    '#users': {
        component: headerView,
        isProtected: true,
    },
};

window.headerRouter = new Router({
    routes: headerRoutes,
    dataService: dataService,
    rootElement: 'header',
});

window.router = new Router({
    routes: routes,
    dataService: dataService,
    rootElement: 'sectionContent',
});

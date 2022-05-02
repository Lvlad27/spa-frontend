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

const router = {
    '#Login': loginFormView,
    '#signUp': signUpFormView,
    '#userList': userListView,
    '#user': userFormView,
};

function onLoad() {
    window.location = '#Login';
}

function onHashChange() {
    const route = location.hash.split('/')[0];
    const param = location.hash.split('/')[1];
    const element = router[route].getElement();

    const main = document.getElementById('main');
    main.prepend(element);
}

// document.addEventListener('DOMContentLoaded', window);
window.addEventListener('DOMContentLoaded', onLoad);
document.addEventListener('hashchange', onHashChange);

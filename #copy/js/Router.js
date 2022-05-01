import Storage from './DataService';
import templateRenderer from './helpers.js';

const usersTable = new UsersTableView(storage, templateRenderer),
    userFormView = new UserFormView(storage, templateRenderer);

const router = {
    '#loginForm': LoginFormView,
    '#signUpForm': SignUpFormView,
    '#userTableHeader': UserTableHeader,
    '#userTableRows': UserTableRows,
};

function onHashChange() {
    const route = location.hash.split('/')[0];
    const param = location.hash.split('/')[1];
    const element = this.router[route].getElement(param);

    // this.switchView(element);
}

import BaseView from './BaseView.js';

class UserTableView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('UserListView');
    }

    getData() {
        return this.DataService.getUsers();
    }
}

export default UserTableView;

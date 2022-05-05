import BaseView from './BaseView.js';

class UserTableView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('UserListView');
    }

    getData(param) {
        return {};
    }
}

export default UserTableView;

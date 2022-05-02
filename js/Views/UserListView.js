import BaseView from './BaseView.js';

class UserTableView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('loginAccount');
    }

    getData(param) {
        const name = param;
        return this.DataService.getUser(name);
    }
}

export default UserTableView;

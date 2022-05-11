import User from '../User.js';
import BaseView from './BaseView.js';

class UserFormView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('UserFormView');
    }

    getData(param) {
        const name = param;
        return this.DataService.getUser(name);
    }

    $;
}

export default UserFormView;

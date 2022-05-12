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

    $editUserBtn(event) {
        if (event.target.matches('#editUserBtn')) {
            const userdataForm = document.getElementById('userdataForm');
            const inputs = userdataForm.querySelectorAll('input');

            // const selectedUser =
        }
    }
}

export default UserFormView;

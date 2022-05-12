import BaseView from './BaseView.js';

class UserTableView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('UserListView');

        document.addEventListener('click', this.$cancelBtn.bind(this));
    }

    getData() {
        return this.DataService.getUsers();
    }

    $cancelBtn(event) {
        if (event.target.matches('#cancelBtn')) {
            window.router.goTo('#userlist');
        }
    }
}

export default UserTableView;

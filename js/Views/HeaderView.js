import BaseView from './BaseView.js';

class HeaderView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('HeaderView');
    }

    getData() {
        return this.DataService.getLoggedUserObj();
    }

    $logoutBtn(event) {
        if (event.target.matches('#logoutBtn')) {
            this.DataService.deleteUserSession();
        }
    }
}

export default HeaderView;

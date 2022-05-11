import BaseView from './BaseView.js';

class NavView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('NavView');

        document.addEventListener('click', this.$sideBarUserTableBtn.bind(this));
        document.addEventListener('click', this.$logoutBtn.bind(this));
    }

    getData() {
        return {};
    }

    $logoutBtn(event) {
        if (event.target.matches('#sidebarLogoutBtn')) {
            this.DataService.deleteUserSession();
            window.router.goTo('#login');
        }
    }

    $sideBarUserTableBtn(event) {
        if (event.target.matches('#sidebarLogoutBtn')) {
            event.preventDefault();
            window.router.goTo('#userlist');
        }
    }
}

export default NavView;

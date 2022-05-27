import BaseView from './BaseView.js';

class HeaderView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('HeaderView');

        document.addEventListener('click', this.$logoutBtn.bind(this));
    }

    async getData() {
        try {
            const data = await this.DataService.getLoggedUserObj();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    $logoutBtn(event) {
        if (event.target.matches('#logoutBtn')) {
            this.DataService.deleteUserSession();
        }
    }
}

export default HeaderView;

import BaseView from './BaseView.js';

class NavbarView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('NavbarView');
    }

    getData() {
        return {};
    }
}

export default NavbarView;

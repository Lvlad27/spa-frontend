import BaseView from './BaseView.js';

class HeaderView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('HeaderView');
    }

    getData() {
        return {};
    }
}

export default HeaderView;

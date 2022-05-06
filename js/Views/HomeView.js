import BaseView from './BaseView.js';

class HomeView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('HomeView');
    }

    getData() {
        return {};
    }
}

export default HomeView;

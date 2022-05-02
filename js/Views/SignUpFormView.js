import BaseView from './BaseView.js';

class SignUpFormView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('SignUpFormView');
    }

    getData(param) {
        const name = param;
        return this.DataService.getUser(name);
    }
}

export default SignUpFormView;

/*

*/

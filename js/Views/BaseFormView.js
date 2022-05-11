import BaseView from './BaseView.js';

class BaseFormView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
    }

    getData() {
        return {};
    }

    validateFormOnSubmit(formInputs) {
        let validState = true;
        console.log('wat');
        return validState;
    }
}

export default BaseFormView;

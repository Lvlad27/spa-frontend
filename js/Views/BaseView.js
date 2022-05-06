import { templateRenderer } from '../helpers.js';
// import DataService from '../DataService.js';

// const DataService = new DataService();

class BaseView {
    constructor(DataService, templateRenderer) {
        this.DataService = DataService;
        this.templateRenderer = templateRenderer;
    }

    render(data) {
        const templateHTML = this.template.innerHTML;
        return templateRenderer(templateHTML, data);
    }

    getElement(param) {
        const data = this.getData(param);
        const html = this.render(data);
        return html;
    }
}

export default BaseView;

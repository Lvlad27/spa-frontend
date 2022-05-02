class BaseView {
    constructor(DataService, templateRenderer) {
        this.DataService = DataService;
        this.templateRenderer = templateRenderer;
    }

    // this function receives a data parameter which can be a "name".
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

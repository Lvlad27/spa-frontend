class BaseView {
    constructor(DataService, templateRenderer) {
        this.DataService = DataService;
        this.templateRenderer = templateRenderer;
    }

    render(data) {
        const templateHTML = this.template.innerHTML;
        return this.templateRenderer(templateHTML, data);
    }

    getElement(param) {
        const data = this.getData(param);
        const html = this.render(data);
        return html;
    }
}

export default BaseView;

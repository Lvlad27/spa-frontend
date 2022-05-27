class BaseView {
    constructor(DataService, templateRenderer) {
        this.DataService = DataService;
        this.templateRenderer = templateRenderer;
    }

    render(data) {
        const templateHTML = this.template.innerHTML;
        return this.templateRenderer(templateHTML, data);
    }

    async getElement(param) {
        try {
            const data = await this.getData(param);
            const html = await this.render(data);
            return html;
        } catch (error) {
            console.error(error);
        }
    }
}

export default BaseView;

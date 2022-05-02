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

class UsersView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('usersView');
    }

    getData(param) {
        const name = param;
        return this.DataService.getUser(name);
    }
}

class AboutView {
    constructor(DataService, templateRenderer) {
        this.DataService = DataService;
        this.template = document.getElementById('aboutView');
        this.templateRenderer = templateRenderer;
    }

    //
    getData(param) {
        return {};
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

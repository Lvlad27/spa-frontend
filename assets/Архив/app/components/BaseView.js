export class BaseView {
  constructor(DataStorage, templateRenderer) {
    this.DataStorage = DataStorage;
    this.templateRenderer = templateRenderer;
  }

  render(data) {
    const templateHTML = this.template.innerHTML;
    return this.templateRenderer(templateHTML, data);
  }

  getData() {
    return {}
  }

  getElement(param) {
    const data = this.getData(param);
    const html = this.render(data);

    return html;
  }
}

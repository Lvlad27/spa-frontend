import DataService from '';
import templateRenderer from '';

const usersView = new UsersView(DataService, templateRenderer);
const aboutView = new AboutView(DataService, templateRenderer);

const router = {
    '#users': usersView,
    '#aboutus': aboutView,
};

function onHashChange() {
    ///
    const route = '#users';
    const param = 'igor';

    const element = this.router[route].getElement(param);

    this.switchView(element);
}

class Router {
    constructor(options) {
        this.routes = options.routes;
        this.dataService = options.dataService;
        this.rootElement = document.getElementById(options.rootElement);

        this.onHashChange();
        window.addEventListener('hashchange', this.onHashChange.bind(this));
    }

    onHashChange() {
        const url = location.hash.split('/')[0],
            param = location.hash.split('/')[1],
            route = this.routes[url];

        if (!route) {
            return;
        }

        const component = route.component;
        const urlPass = ['', '#login', '#signup'];

        if (this.dataService.isUserLoggedIn() && urlPass.includes(url)) {
            this.goTo('#userlist');
        } else if (!this.dataService.isUserLoggedIn() && route.isProtected) {
            this.goTo('');
        } else {
            this.switchView(component, param);
        }
    }

    async switchView(component, param) {
        const element = component.getElement(param);
        this.rootElement.innerHTML = await element;
    }

    goTo(hash) {
        location.hash = hash;
    }
}

export default Router;

// document.addEventListener('DOMContentLoaded', window);
// window.addEventListener('DOMContentLoaded', switchView('#login'));
// document.addEventListener('hashchange', onHashChange);

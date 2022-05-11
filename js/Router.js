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
            route = this.routes[url];

        if (!route) {
            return;
        }

        const component = route.component;

        if (this.dataService.isUserLoggedIn() && ['', '#login', '#signup'].includes(url)) {
            this.goTo('#home');
            this.switchView();
        } else if (!this.dataService.isUserLoggedIn() && route.isProtected) {
            console.log('call');
            this.goTo('#login');
            this.switchView(component);
        } else {
            this.switchView(component);
        }
    }

    switchView(component, param) {
        const element = component.getElement(param);
        this.rootElement.innerHTML = element;
    }

    goTo(hash) {
        location.hash = hash;
    }
}

export default Router;

// document.addEventListener('DOMContentLoaded', window);
// window.addEventListener('DOMContentLoaded', switchView('#login'));
// document.addEventListener('hashchange', onHashChange);

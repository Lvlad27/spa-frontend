class Router {
    constructor() {
        const ROUTES = this.ROUTES;
        window.addEventListener('hashchange', this.onRouteChange);
    }

    ROUTES = {};

    onRouteChange() {
        const hash = location.hash;
    }
}

export default Router;

/*
1. Declare url that will change.
2. Declare component to be rendered.
3. For every hash render specific component.
*/

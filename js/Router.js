class Router {
    constructor() {
        window.addEventListener('hashchange', this.onRouteChange);
    }

    onRouteChange() {
        const hash = location.hash;

        switch (hash) {
            case '#updateUserDataForm':
                //
                break;

            case '#usertable':
                //
                break;
        }
    }
}

export default Router;

/*
1. Declare url that will change.
2. Declare component to be rendered.
3. For every hash render specific component.
*/

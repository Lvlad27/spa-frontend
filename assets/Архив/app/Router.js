export class Router {
    constructor(options) {
        this.currentLayout = 'notLogged';

        this.routes = options.routes;
        //this.LAYOUTS = options.LAYOUTS;
        this.currentLayout = options.currentLayout; //  "notLogged";
        this.DataStorage = options.DataStorage;
        this.rootElement = document.getElementById(options.rootElement);

        this.cache = {
            url: '',
            data: '',
        };

        this.onRouteChange();
        window.addEventListener('hashchange', () => {
            this.onRouteChange();
        });
    }

    onRouteChange() {
        const url = location.hash.split('/')[0];
        const param = location.hash.split('/')[1];
        const route = this.routes[url];
        if (!this.routes[url]) {
            return;
        }
        const component = this.routes[url].component;
        const layout = this.routes[url].layout;

        if (!this.DataStorage.userIsLogged() && route.isProtected) {
            this.goTo('');
        } else {
            const newData = component.getData(param);

            if (
                this.cache.templateId !== component.template.id ||
                JSON.stringify(this.cache.data) !== JSON.stringify(newData)
            ) {
                this.cache = {
                    templateId: component.template.id,
                    data: newData,
                };

                this.switchView(component, param);
            }
        }
    }
    goTo(hash) {
        location.hash = hash;
    }
    switchView(component, param) {
        console.log('view is switched');
        const element = component.getElement(param);

        this.rootElement.innerHTML = element;
    }
    //   setCurrentLayout(layout) {
    //     this.currentLayout = layout;
    //     this.LAYOUTS[this.currentLayout]();
    //     return this.currentLayout;
    //   }
}

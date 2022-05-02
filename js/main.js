import UserInterface from './UserInterface.js';

//what
class Router {
    constructor(componentId, routes) {
        this.routes = routes;
        this.errorHTML = options.errorHTML ? options.errorHTML : '<div>Not found</div>';
        // The componentId holds the router as well as the header and footer if they are also present
        this.componentId = document.getElementById(componentId);
        // The router is attached to the window so that it can be accessed easily
        this = window.router;
    }

    _appendComponent() {
        if (typeof element === 'string') {
            const createdElement = document.createElement('div');
            createdElement.innerHTML = element;
            anchor.appendChild(createdElement);
        } else if (typeof element === 'function') {
            // Params may be passed to new elements that are created by functions
            const generated = element({ params: opts.params });
            _appendComponent(elementName, generated, anchor, opts);
        } else {
            anchor.appendChild(element);
        }
    }
}

export default Router;

/*
STEP 1 - CREATING A ROUTER
import Router from 'router.js';
const router = new Router(componentId, routes);

    - componentId is a string that is the id of the component that the router will attach to.
    - routes is an object in the following format:
        const routes = {
	        [url]: [component],
	        [url]: [component],
	        ...
        };
    The url is a string that is the relative path of the url for a particular component and the route.

STEP 2 - CREATING COMPONENTS
Three different ways:
    - a string:
        const COMPONENT = '<div>My Component</div>';
        
    - a function that returns a string or template literal:
        function Component() {
            return '<div>My Component</div>';
        }

    - a function that returns a DOM element:
        function Component() {
            const div = document.createElement('div');
            div.textContent = 'My Component';
            return div;
        }

    - an object with render method that is a function that returns a string or template literal

STEP 3 - NAVIGATION
Two ways to navigate with the router:
    - using JavaScript:
        window.router.goTo(route);

    - adding an HTML anchor element with a class of 'router-link':
        <a class="router-link" href="#component">My Link</a>
        Any HTML elements with that class name at the time a route is loaded will navigate using the router.
*/

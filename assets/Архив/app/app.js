
import { DataStorage } from "./DataStorage.js";
import { templateRendererWithJS } from "./functions.js";

import { EditUser } from "./components/EditUser.js";
import { UsersTable } from "./components/UsersTable.js";
import { LogInForm } from "./components/LogInForm.js";
import { SignUpForm } from "./components/SignUpForm.js";
import { WelcomeLoggedUser } from "./components/WelcomeLoggedUser.js";
import { HeaderView } from './components/HeaderView.js'

import { Router } from "./Router.js";


const usersTable = new UsersTable(DataStorage, templateRendererWithJS);
const editUser = new EditUser(DataStorage, templateRendererWithJS);
const logInForm = new LogInForm(DataStorage, templateRendererWithJS);
const signUpForm = new SignUpForm(DataStorage, templateRendererWithJS);
const headerView = new HeaderView(DataStorage, templateRendererWithJS);
const welcomeLoggedUser = new WelcomeLoggedUser(
    DataStorage,
    templateRendererWithJS
  );

const mainHeader = document.getElementById("main-header");

const routes = {
    "#users-list": {
      component: usersTable,
      isProtected: true,
      layout: "logged",
    },
    "#users": {
      component: editUser,
      isProtected: true,
      layout: "logged",
    },
    "#signup": {
      component: signUpForm,
      isProtected: false,
      layout: "notLogged",
    },
    "": {
      component: logInForm,
      isProtected: false,
      layout: "notLogged",
    },
};

const headerRoutes = {
    "#users-list": {
      component: headerView,
      isProtected: true,
      layout: "logged",
    },
    "#users": {
      component: headerView,
      isProtected: true,
      layout: "logged",
    }
};



// const LAYOUTS = {
//     notLogged: () => {
//       mainHeader.innerHTML = "";
//     },

//     logged: () => {
//       mainHeader.innerHTML = welcomeLoggedUser.getElement();
//     },
//   };

window.headerRouter = new Router({
    routes: headerRoutes,
    DataStorage: DataStorage,
    rootElement: 'main-header',
});

window.router = new Router({
    routes: routes,
    DataStorage: DataStorage,
    rootElement: 'root',
});

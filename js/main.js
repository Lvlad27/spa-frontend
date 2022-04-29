import Storage from './Storage.js';
import App, { signUpFormInputs, loginFormInputs } from './App.js';
import FormValidation from './FormValidation.js';
import UserInterface from './UserInterface.js';
// import Router from './Router.js';

const loginForm = document.querySelector('.form__login'),
    signUpForm = document.querySelector('.form__registration');

const loginFormValidation = new FormValidation(loginForm, loginFormInputs),
    signUpFormValidation = new FormValidation(signUpForm, signUpFormInputs),
    storage = new Storage(),
    userInterface = new UserInterface(storage),
    // router = new Router(),
    app = new App(storage, loginFormValidation, signUpFormValidation, userInterface);

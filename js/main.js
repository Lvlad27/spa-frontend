import User from './user.js';
import Storage from './storage.js';
import App, { signUpFormInputs, loginFormInputs } from './app.js';
import FormValidation from './formValidation.js';

const loginForm = document.querySelector('.form__login');
const signUpForm = document.querySelector('.form__registration');

const loginFormValidation = new FormValidation(loginForm, loginFormInputs);
const signUpFormValidation = new FormValidation(signUpForm, signUpFormInputs);

const storage = new Storage();
const app = new App(storage);
// const app = new App(storage, loginFormValidation, signUpFormValidation);

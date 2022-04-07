import User from './user.js';
import Storage from './storage.js';
import App, { signUpFormInputs, loginFormInputs } from './app.js';
import FormValidation from './formValidation.js';

const storage = new Storage();
const app = new App(storage);

const loginForm = document.querySelector('.form__login');
const signUpForm = document.querySelector('.form__registration');

const loginFormValidator = new FormValidation(loginForm, loginFormInputs);
const signUpFormValidator = new FormValidation(signUpForm, signUpFormInputs);

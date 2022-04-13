import User from './User.js';
import Storage from './Storage.js';
import App, { signUpFormInputs, loginFormInputs } from './App.js';
import FormValidation from './FormValidation.js';
import UserInterface from './UserInterface.js';

const loginForm = document.querySelector('.form__login');
const signUpForm = document.querySelector('.form__registration');

const loginFormValidation = new FormValidation(loginForm, loginFormInputs);
const signUpFormValidation = new FormValidation(signUpForm, signUpFormInputs);

const storage = new Storage();
const userInterface = new UserInterface(storage);
const app = new App(storage, loginFormValidation, signUpFormValidation, userInterface);

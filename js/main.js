import User from './user.js';
import Storage from './storage.js';
import App from './app.js';
import FormValidation from './formValidation.js';

const storage = new Storage();
const app = new App(storage);
const formValidation = new FormValidation(form, fields);

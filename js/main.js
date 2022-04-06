import User from './user.js';
import Storage from './storage.js';
import App from './app.js';

const storage = new Storage();

const app = new App(storage);

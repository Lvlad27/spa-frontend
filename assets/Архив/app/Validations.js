import { DataStorage } from "./DataStorage.js";

export const VALIDATIONS = {
  usernameIsAvailable: (value, parameters) =>
    DataStorage.getUser(value) === undefined,

  emailIsValid: (value, parameters) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value),

  includeNumbers: (value, parameters) => /\d/.test(value),

  includeLetters: (value, parameters) => /[a-zA-Z]/.test(value),

  minLength: (value, parameters) => value.length >= parameters,

  passwordsMatch: (value, parameters) =>
    value === document.getElementById(parameters).value,

  loginValid: (value, parameters) => {
    const userName = document.getElementById(parameters).value;
    const user = DataStorage.getUser(userName);
    if (user) {
      if (value !== user.password) {
        document.getElementById(parameters).classList.add("invalid-input");
      }
      return value === user.password;
    } else {
      document.getElementById(parameters).classList.add("invalid-input");
      return false;
    }
  },
};

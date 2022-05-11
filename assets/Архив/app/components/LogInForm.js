import { BaseForm } from "./BaseForm.js";

export class LogInForm extends BaseForm {
  constructor(DataStorage, templateRenderer) {
    super(DataStorage, templateRenderer);
    this.template = document.getElementById("log-in-template");
    document.addEventListener("click", this.onLogInButtonClick.bind(this));
  }
  getData() {
    return {};
  }
  onLogInButtonClick(event) {
    if (event.target.matches("#button-log-in")) {
      event.preventDefault();
      const userNameInput = document.getElementById("username-log-in");
      const logInForm = document.getElementById("form-log-in");
      const userName = userNameInput.value.trim();
      const inputsLogIn = logInForm.querySelectorAll("#password-log-in");

      if (this.validateForm(inputsLogIn)) {
        this.DataStorage.login(userName);
        window.router.goTo("#users-list");
      }
    }
  }
}

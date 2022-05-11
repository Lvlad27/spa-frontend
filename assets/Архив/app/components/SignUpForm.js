import { BaseForm } from "./BaseForm.js";

export class SignUpForm extends BaseForm {
  constructor(DataStorage, templateRenderer) {
    super(DataStorage, templateRenderer);
    this.template = document.getElementById("sign-up-template");
    document.addEventListener("click", this.onSignUpButtonClick.bind(this));
  }
  getData() {
    return {};
  }
  onSignUpButtonClick(event) {
    if (event.target.matches("#button-sign-up")) {
      event.preventDefault();
      this.removeRedBorders();

      const signUpForm = document.getElementById("form-sign-up");
      const userName = document.getElementById("username-sign-up").value.trim();
      const email = document.getElementById("email-sign-up").value.trim();
      const password = document.getElementById("password-sign-up").value.trim();
      const inputs = signUpForm.querySelectorAll(".input");

      if (this.validateForm(inputs)) {
        this.DataStorage.saveUser(userName, email, password);
        window.router.goTo("")
      }
    }
  }
}

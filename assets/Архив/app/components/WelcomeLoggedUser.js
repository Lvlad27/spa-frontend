import { BaseView } from "./BaseView.js";
import { DataStorage } from "../DataStorage.js";

export class WelcomeLoggedUser extends BaseView {
  constructor(DataStorage, templateRenderer) {
    super(DataStorage, templateRenderer);
    this.template = document.getElementById("welcome-logged-user-template");
    document.addEventListener("click", this.logout);
  }
  getData() {
    const username = this.DataStorage.getLoggedUser();
    return this.DataStorage.getUser(username);
  }
  logout(event) {
    if (event.target.matches("#log-out-button")) {
      DataStorage.logout();
    }
  }

}

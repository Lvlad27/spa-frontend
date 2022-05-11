import { BaseView } from "./BaseView.js";

export class HeaderView extends BaseView {
  constructor(DataStorage, templateRenderer) {
    super(DataStorage, templateRenderer);
    this.template = document.getElementById("welcome-logged-user-template");
  }

  getData() {
      console.log(this.DataStorage.getLoggedUserObj())
    return this.DataStorage.getLoggedUserObj();
  }
}
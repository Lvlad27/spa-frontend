import { BaseView } from "./BaseView.js";

export class UsersTable extends BaseView {
  constructor(DataStorage, templateRenderer) {
    super(DataStorage, templateRenderer);
    this.template = document.getElementById("users-table-template");
  }

  getData() {
    return this.DataStorage.getAllUsers();
  }
}

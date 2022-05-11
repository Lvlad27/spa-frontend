import { BaseForm } from "./BaseForm.js";

export class EditUser extends BaseForm {
  constructor(DataStorage, templateRenderer) {
    super(DataStorage, templateRenderer);
    this.template = document.getElementById("edit-user-template");
    document.addEventListener("click", this.onEditUserClick.bind(this));
  }

  getData(param) {
    return this.DataStorage.getUser(param);
  }
  onEditUserClick(event) {
    if (event.target.matches("#button-save-user-info")) {
      event.preventDefault();
      this.removeRedBorders();
      const editUserForm = document.getElementById("form-edit-user-info");
      const inputs = editUserForm.querySelectorAll(".input");
      const selectedUserName =
        document.getElementById("user-avatar").firstChild.innerHTML;
      const newEmail = document.getElementById("edit-user-email").value.trim();
      const newPassword = document
        .getElementById("edit-user-password")
        .value.trim();
      const newGender = document.getElementsByName("gender");
      let selectedGender;
      newGender.forEach((gender) => {
        if (gender.checked) {
          selectedGender = gender.value;
        }
      });
      const newCountry = document.getElementById("edit-user-country").value;
      const newHobbies = document.getElementsByName("hobbies");
      const selectedHobbies = [];
      newHobbies.forEach((hobby) => {
        if (hobby.checked) {
          selectedHobbies.push(hobby.value);
        }
      });
      if (this.validateForm(inputs)) {
        this.DataStorage.editUser(
          selectedUserName,
          newEmail,
          newPassword,
          selectedGender,
          newCountry,
          selectedHobbies
        );
        window.router.goTo("#users-list");
      }
    }
  }

}

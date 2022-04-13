class UserInterface {
    constructor(storage) {
        this.storage = storage;
    }

    displayUsers() {
        const storedUserData = this.storage.getUsers();
        Object.keys(storedUserData).forEach(
            function (key) {
                this.addUserToList(storedUserData[key]);
            }.bind(this)
        );
    }

    addUserToList(user) {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${user.userName}</td>
        <td>${user.password}</td>
        <td><a href="#" class="edit-user">Edit</a></td>
        `;
        userList.appendChild(row);
    }

    editUser() {
        /* 
        1. Form with country, date of birth, checkboxes for hobbies, radio button for gender (select, date, radio buttons, checkbox)
        */
    }
}

export default UserInterface;

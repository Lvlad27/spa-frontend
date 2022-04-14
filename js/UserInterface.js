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
        <td>${user.name}</td>
        <td>${user.surname}</td>
        <td>${user.country}</td>
        <td>${user.birthday}</td>
        <td>${user.gender}</td>
        <td>${user.hobbies}</td>
        <td><button type="button" class="edit-user">Edit</button></td>
        `;
        userList.appendChild(row);
    }
}

export default UserInterface;

class UserInterface {
    constructor(storage) {
        this.storage = storage;
    }

    displayUsers(usersArray = this.storage.getUsersArray()) {
        usersArray.forEach((userObj) => {
            this.addUserToTable(userObj);
        });
    }

    addUserToTable(user) {
        let row = document.createElement('tr');

        row.innerHTML = `
        <td data-email>${user.userName}</td>
        <td>${user.password}</td>
        <td>${user.firstName}</td>
        <td>${user.surname}</td>
        <td>${user.country}</td>
        <td>${user.birthday}</td>
        <td>${user.gender}</td>
        <td>${user.hobbies}</td>
        <td><a href="#updateUserDataForm" class="btn edit-user">Edit</a></td>
        `;
        userList.appendChild(row);
    }
}

export default UserInterface;

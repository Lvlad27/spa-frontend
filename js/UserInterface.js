class UserInterface {
    constructor(storage) {
        this.storage = storage;
    }

    displayUsers(usersArray = this.storage.getUsersArray()) {
        console.log('userInterfaceCall', usersArray);
        usersArray.forEach((userObj) => {
            this.addUserToTable(userObj);
        });
    }

    addUserToTable(user) {
        let row = document.createElement('tr');

        row.innerHTML = `
        <td>${user.userName}</td>
        <td>${user.password}</td>
        <td>${user.firstName}</td>
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

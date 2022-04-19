import User from './User.js';

class Storage {
    getUsers() {
        let storedUserData = {};
        if (localStorage.getItem('storedUserData') !== null) {
            storedUserData = JSON.parse(localStorage.getItem('storedUserData'));
        }
        return storedUserData;
    }

    storeUser(user) {
        let storedUserData = this.getUsers();
        storedUserData[user.userName] = user;
        localStorage.setItem('storedUserData', JSON.stringify(storedUserData));
    }

    getUsersArray() {
        let storedUserData = this.getUsers();

        let usersArray = [];
        Object.keys(storedUserData).forEach(
            function (key) {
                usersArray.push(storedUserData[key]);
            }.bind(this)
        );
        return usersArray;
    }

    editUser() {
        let usersArray = this.getUsersArray();
        let firstName = document.getElementById('firstName'),
            surname = document.getElementById('surname'),
            country = document.getElementById('country'),
            birthday = document.getElementById('birthday'),
            checkedHobbies = Array.from(
                userdataForm.querySelectorAll('input[name="prefer"]:checked')
            )
                .map((checkbox) => checkbox.value)
                .toString(),
            gender = document.querySelector('input[name=gender]:checked');

        let user = new User(
            usersArray[userIndex].userName,
            usersArray[userIndex].password,
            firstName.value,
            surname.value,
            country.value,
            birthday.value,
            gender.value,
            checkedHobbies
        );
        this.storage.storeUser(user);
    }
}

export default Storage;

/*Hope it's not serious! I can wait till tomorrow, managed to fix the code, still would like to do some refactoring, I may have a questions a little bit later */

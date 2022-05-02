import User from './User.js';

class DataService {
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

    updateUser(username, data) {
        let usersArray = this.getUsersArray();
        usersArray.forEach((_, index) => {
            if (usersArray[index].userName === username) {
                let user = new User(
                    usersArray[index].userName,
                    data.password,
                    data.firstName,
                    data.surname,
                    data.country,
                    data.birthday,
                    data.gender,
                    data.hobbies
                );
                return this.storeUser(user);
            }
        });
    }

    saveUserSession(username) {
        sessionStorage.setItem('loggedUser', JSON.stringify(username));
    }

    getLoggedUser() {
        return JSON.parse(sessionStorage.getItem('loggedUser'));
    }

    deleteUserSession() {
        sessionStorage.removeItem('loggedUser');
    }
}

export default DataService;

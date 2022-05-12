class DataService {
    getUsers() {
        let storedUserData = {};
        if (localStorage.getItem('storedUserData') !== null) {
            storedUserData = JSON.parse(localStorage.getItem('storedUserData'));
        }
        return storedUserData;
    }

    storeUser(userName, password) {
        let storedUserData;
        if (this.getUsers()) {
            storedUserData = this.getUsers();
            storedUserData[userName] = {
                userName: userName,
                password: password,
                firstName: '',
                surName: '',
                country: '',
                gender: '',
                hobbies: '',
            };
        } else {
            storedUserData = {};
            storedUserData[userName] = {
                userName: userName,
                password: password,
                firstName: '',
                surName: '',
                country: '',
                gender: '',
                hobbies: '',
            };
        }
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

    getUser(userName) {
        let storedUserData = JSON.parse(localStorage.getItem('storedUserData'));
        if (storedUserData) {
            console.log('storedUserData', storedUserData);
            userName = userName.replaceAll('"', '');
            return storedUserData[userName];
        } else return undefined;
    }

    checkLogin() {
        const loginUserName = document.getElementById('loginUserName').value,
            loginPassword = document.getElementById('loginPassword').value;
        const userArray = this.getUsersArray(),
            AllUserNames = userArray.map((user) => user.userName),
            AllUserPasswords = userArray.map((user) => user.password);

        if (AllUserNames.includes(loginUserName) && AllUserPasswords.includes(loginPassword)) {
            this.saveUserSession(loginUserName);
            return true;
        } else {
            return false;
        }
    }

    updateUser(userName, password, firstName, surName, country, gender, hobbies) {
        let storedUserData = JSON.parse(localStorage.getItem('users'));
        users[userName] = {
            userName: userName,
            password: password,
            firstName: firstName,
            surName: surName,
            country: country,
            gender: gender,
            hobbies: hobbies,
        };
        localStorage.setItem('storedUserData', JSON.stringify(storedUserData));
    }

    saveUserSession(username) {
        sessionStorage.setItem('loggedUser', JSON.stringify(username));
    }

    getLoggedUser() {
        return JSON.parse(sessionStorage.getItem('loggedUser'));
    }

    getLoggedUserObj() {
        const userName = sessionStorage.getItem('loggedUser');
        return this.getUser(userName);
    }

    isUserLoggedIn() {
        if (this.getLoggedUser() !== null) {
            return true;
        } else {
            return false;
        }
    }

    deleteUserSession() {
        sessionStorage.removeItem('loggedUser');
    }
}

export default DataService;

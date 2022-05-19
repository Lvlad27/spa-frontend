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
                surname: '',
                country: '',
                birthday: '',
                gender: '',
                hobbies: '',
                profileImgName: '',
            };
        } else {
            storedUserData = {};
            storedUserData[userName] = {
                userName: userName,
                password: password,
                firstName: '',
                surname: '',
                country: '',
                birthday: '',
                gender: '',
                hobbies: '',
                profileImgName: '',
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

    updateUser(
        userName,
        password,
        firstName,
        surname,
        country,
        birthday,
        gender,
        hobbies,
        profileImgName
    ) {
        let storedUserData = JSON.parse(localStorage.getItem('storedUserData'));
        storedUserData[userName] = {
            userName: userName,
            password: password,
            firstName: firstName,
            surname: surname,
            country: country,
            birthday: birthday,
            gender: gender,
            hobbies: hobbies,
            profileImgName: profileImgName,
        };
        localStorage.setItem('storedUserData', JSON.stringify(storedUserData));
    }

    // updateUserImg(userName, imgName) {
    //     let storedUserData = localStorage.getItem('storedUserData');
    //     storedUserData[userName].profileImgName = imgName;
    //     localStorage.setItem('storedUserData', JSON.stringify(storedUserData));
    // }

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

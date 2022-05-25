class DataService {
    async storeUser(user) {
        let url = 'http://localhost:3000/dataservice/create';
        const options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' },
        };

        try {
            const res = await fetch(url, options);
            const data = await res.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async updateUser() {}

    async checkLogin() {
        const loginUserName = document.getElementById('loginUserName').value,
            loginPassword = document.getElementById('loginPassword').value;
        const userArray = await this._getUsers();
        const allUserNames = userArray.map((user) => user.email);
        const allUserPasswords = userArray.map((user) => user.password);

        if (allUserNames.includes(loginUserName) && allUserPasswords.includes(loginPassword)) {
            await this._saveUserSession(loginUserName);
            return true;
        } else {
            return false;
        }
    }

    async _saveUserSession(username) {
        const id = await this._getUserId(username);
        console.log('id', id);
        sessionStorage.setItem('loggedUser', id);
    }

    async _getUserId(username) {
        const USERS = await this._getUsers();
        return USERS.find((user) => {
            user.email === username ? user._id : false;
        });
    }

    async _getUsers() {
        const url = 'http://localhost:3000/dataservice';
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }

    getLoggedUser() {
        return JSON.parse(sessionStorage.getItem('loggedUser'));
    }

    getLoggedUserObj() {
        const userName = sessionStorage.getItem('loggedUser');
        return this.getUser(userName);
    }

    isUserLoggedIn() {
        this.getLoggedUser() !== null ? true : false;
    }

    deleteUserSession() {
        sessionStorage.removeItem('loggedUser');
    }

    async getProfileImg(formData) {
        let url = 'http://localhost:3000/dataservice/uploadProfileImg';
        let options = {
            method: 'POST',
            body: formData,
        };

        try {
            const res = await fetch(url, options);
            const data = await res.json();
            return data.filename;
        } catch (error) {
            console.error(error);
        }
    }

    // async _getUserById(id) {
    //     console.log('_getUserById call');
    //     let url = `http://localhost:3000/dataservice/${id}`;
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     console.log('data', data);
    //     return data;
    // }
}

export default DataService;

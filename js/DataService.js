class DataService {
    async getUsers() {}
    async getUsersArray() {}
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
    checkLogin() {
        const loginUserName = document.getElementById('loginUserName').value,
            loginPassword = document.getElementById('loginPassword').value;
        const userArray = this.getUsersArray(),
            allUserNames = userArray.map((user) => user.userName),
            allUserPasswords = userArray.map((user) => user.password);

        if (allUserNames.includes(loginUserName) && allUserPasswords.includes(loginPassword)) {
            this.saveUserSession(loginUserName);
            return true;
        } else {
            return false;
        }
    }
    async updateUser() {}

    async getUser(id) {
        let url = `http://localhost:3000/dataservice/${id}`;
        const user = await fetch(url);
        return user;
    }
    saveUserSession() {}
    getLoggedUser() {}
    getLoggedUserObj() {}

    async login(userName) {
        const id = await this.getUserId(userName);
        localStorage.setItem('loggedUser', id);
    }

    isUserLoggedIn() {}

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
}

export default DataService;

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

    async updateUser(user) {
        let url = `http://localhost:3000/dataservice/update`;
        const options = {
            method: 'PATCH',
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

    async _saveUserSession(username) {
        try {
            const id = await this._getUserId(username);
            sessionStorage.setItem('loggedUser', id);
        } catch (error) {
            console.error(error);
        }
    }

    async _getUserId(username) {
        try {
            const USERS = await this.getUsers();
            const found = USERS.find((element) => element.email === username);
            return found._id;
        } catch (error) {
            console.error(error);
        }
    }

    async getUsers() {
        try {
            const url = 'http://localhost:3000/dataservice';
            const res = await fetch(url);
            let data = await res.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    _getLoggedUserId() {
        return sessionStorage.getItem('loggedUser');
    }

    async _getUserById(id) {
        try {
            const url = `http://localhost:3000/dataservice/${id}`;
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getUser(email) {
        try {
            const id = await this._getUserId(email);
            const url = `http://localhost:3000/dataservice/${id}`;
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getLoggedUserObj() {
        try {
            const id = this._getLoggedUserId();
            const user = await this._getUserById(id);
            return user;
        } catch (error) {
            console.error(error);
        }
    }

    isUserLoggedIn() {
        return this._getLoggedUserId() !== null ? true : false;
    }

    deleteUserSession() {
        sessionStorage.removeItem('loggedUser');
    }

    async deleteUser(email) {
        const id = await this._getUserId(email);
        const url = `http://localhost:3000/dataservice/${id}`;
        const options = {
            method: 'DELETE',
        };
        const res = await fetch(url, options);
        const data = await res.json();
        return data;
    }

    async upload(body, url) {
        let options = {
            method: 'POST',
            body: body,
        };
        try {
            const res = await fetch(`http://localhost:3000/dataservice/${url}`, options);
            const data = await res.json();
            return data.filename;
        } catch (error) {
            console.error(error);
        }
    }

    async storePost(post) {
        let url = 'http://localhost:3000/dataservice/posts/create';
        const options = {
            method: 'POST',
            body: JSON.stringify(post),
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

    async getPosts(email) {
        try {
            const id = await this._getUserId(email);
            const url = `http://localhost:3000/dataservice/posts/${id}`;
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getAllPosts() {
        try {
            const url = `http://localhost:3000/dataservice/posts`;
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    // async deletePost(post) {
    //     const allPosts = await this.getAllPosts();
    //     const id =
    //     const url = `http://localhost:3000/dataservice/posts/${id}`;
    //     const options = {
    //         method: 'DELETE',
    //     };
    //     const res = await fetch(url, options);
    //     const data = await res.json();
    //     return data;
    // }
}

export default DataService;

class Storage {
    getUsers() {
        let userStorage = {};
        if (localStorage.getItem('userStorage') !== null) {
            userStorage = JSON.parse(localStorage.getItem('userStorage'));
        }
        return userStorage;
    }

    storeUser(user) {
        let userStorage = this.getUsers();
        userStorage[user.userName] = user;
        localStorage.setItem('userStorage', JSON.stringify(userStorage));
    }

    // addUser() {
}

export default Storage;

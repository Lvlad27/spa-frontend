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

    editUser(user) {
        // Get the existing data
        let currentUsersArray = this.getUsersArray();

        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array

        // const user = new User(
        //     userName.value,
        //     password.value,
        //     name.value,
        //     surname.value,
        //     country.value,
        //     birthday.value,
        //     gender.value,
        //     checkedHobbies
        // );
        let trArr = userList.childNodes;
        let tdArr = [...trArr].map((tr) => tr.children);

        for (let i = 0; i < tdArr.length; i++) {
            console.log('td[i]', tdArr[i][0].innerHTML);
            let rowIndexName = tdArr[i][0].innerHTML;

            if (rowIndexName === user.userName) {
                // user['name'] = name.value;
                // user['surname'] = surname.value;
                // user['country'] = country.value;
                // user['birthday'] = birthday.value;
                // user['gender'] = gender.value;
                // user['checkedHobbies'] = checkedHobbies;
            }
        }

        let storedUserData = this.storage.getUsers();

        let keysArray = Object.entries(storedUserData);
        console.log('keysArray', keysArray);

        // if(userList.children[i].innerHTML === 'user.userName') {

        /*
        const keysArray = Object.keys(storedUserData);



        keysArray.forEach(
            function (key) {
                let user = storedUserData[key];
                let userKeys = Object.keys(user);
                console.log('userKeys', userKeys);

                for (let i = 0; i <= keysArray; i++) {
                    console.log(user[0]);
                    // Object.assign(user, { name: name.value });
                }
            }.bind(this)
        );
        */
    }
}

export default Storage;

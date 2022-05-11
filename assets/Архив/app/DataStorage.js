export class DataStorage {
  static saveUser(userName, email, password) {
    let users;
    if (JSON.parse(localStorage.getItem("users"))) {
      users = JSON.parse(localStorage.getItem("users"));
      users[userName] = {
        username: userName,
        email: email,
        password: password,
        gender: "",
        country: "",
        hobbies: "",
      };
    } else {
      users = {};
      users[userName] = {
        username: userName,
        email: email,
        password: password,
        gender: "",
        country: "",
        hobbies: "",
      };
    }
    localStorage.setItem("users", JSON.stringify(users));
  }
  static getUser(userName) {
    let users = JSON.parse(localStorage.getItem("users"));
    if (users) {
      return users[userName];
    } else return undefined;
  }
  static getAllUsers() {
    return JSON.parse(localStorage.getItem("users"));
  }
  static editUser(userName, email, password, gender, country, hobbies) {
    let users = JSON.parse(localStorage.getItem("users"));
    users[userName] = {
      username: userName,
      email: email,
      password: password,
      gender: gender,
      country: country,
      hobbies: hobbies,
    };
    localStorage.setItem("users", JSON.stringify(users));
  }
  static deleteUser(userName) {
    let users = JSON.parse(localStorage.getItem("users"));
    delete users[userName];
    localStorage.setItem("users", JSON.stringify(users));
  }
  static login(userName) {
    localStorage.setItem("loggedUser", userName);
  }
  static getLoggedUser() {
    return localStorage.getItem("loggedUser");
  }
  static getLoggedUserObj() {
    const username = this.getLoggedUser();
    return this.getUser(username);
  }
  static logout() {
    localStorage.removeItem("loggedUser")
  }
  static userIsLogged() {
    return localStorage.getItem("loggedUser") !== null;
  }
}

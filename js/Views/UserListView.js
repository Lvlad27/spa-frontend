import BaseView from './BaseView.js';

class UserListView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('UserListView');

        document.addEventListener('click', this.$deleteBtn.bind(this));
    }

    async getData() {
        try {
            const data = await this.DataService.getUsers();
            const arrayToObject = (arr, key) => {
                return arr.reduce((obj, item) => {
                    obj[item[key]] = item;
                    return obj;
                }, {});
            };
            const dataObj = arrayToObject(data, 'email');
            return dataObj;
        } catch (error) {
            console.error(error);
        }
    }

    async $deleteBtn(event) {
        if (event.target.matches('#deleteUserBtn')) {
            const userToBeDeleted =
                event.target.parentElement.parentElement.firstElementChild.firstElementChild
                    .innerHTML;

            // if(userToBeDeleted === )
            await this.DataService.deleteUser(userToBeDeleted);
        }
    }
}

export default UserListView;

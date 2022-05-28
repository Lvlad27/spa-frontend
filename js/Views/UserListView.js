import BaseView from './BaseView.js';

class UserListView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('UserListView');
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
}

export default UserListView;

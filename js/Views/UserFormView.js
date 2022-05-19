import BaseView from './BaseView.js';

class UserFormView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('UserFormView');

        document.addEventListener('click', this.$cancelBtn.bind(this));
        document.addEventListener('click', this.$submitBtn.bind(this));
    }

    getData(param) {
        const name = param;
        return this.DataService.getUser(name);
    }

    async updateData() {
        const selectedUser = document.getElementById('emailInput').value.trim(),
            updatePass = document.getElementById('passwordInput').value.trim(),
            updateFirstName = document.getElementById('firstName').value.trim(),
            updateSurname = document.getElementById('surname').value.trim(),
            updateCountry = document.getElementById('country').value.trim(),
            updateBirthday = document.getElementById('birthday').value.trim(),
            updateGender = document.getElementsByName('gender'),
            updateHobbies = document.getElementsByName('hobby');

        let selectedGender = [];
        updateGender.forEach((index) => {
            if (index.checked) {
                selectedGender.push(index.value);
            }
        });

        let selectedHobbies = [];
        updateHobbies.forEach((index) => {
            if (index.checked) {
                selectedHobbies.push(index.value);
            }
        });

        const imgFetch = async () => {
            // console.log('username', username);
            const file = document.getElementById('imageInput');
            const formData = new FormData();
            formData.append('profileImg', file.files[0]);

            let url = 'http://localhost:3000/upload';
            let options = { method: 'POST', body: formData };

            const res = await fetch(url, options);
            const data = await res.json();
            return data.filename;
        };

        const profileImgName = await imgFetch();

        return this.DataService.updateUser(
            selectedUser,
            updatePass,
            updateFirstName,
            updateSurname,
            updateCountry,
            updateBirthday,
            selectedGender,
            selectedHobbies,
            profileImgName
        );
    }

    $submitBtn(event) {
        if (event.target.matches('#submitBtn')) {
            event.preventDefault();
            this.updateData();
            window.router.goTo('#userlist');
        }
    }

    $cancelBtn(event) {
        if (event.target.matches('#cancelBtn')) {
            window.router.goTo('#userlist');
        }
    }
}

export default UserFormView;

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

    updateData() {
        const userdataForm = document.getElementById('userdataForm');
        const inputs = userdataForm.querySelectorAll('input');
        const selectedUser = document.getElementById('emailInput').value.trim(),
            updatePass = document.getElementById('passwordInput').value.trim(),
            updateFirstName = document.getElementById('firstName').value.trim(),
            updateSurname = document.getElementById('surname').value.trim(),
            updateCountry = document.getElementById('country').value.trim(),
            updateBirthday = document.getElementById('birthday').value.trim(),
            updateGender = document.getElementsByName('gender'),
            updateHobbies = document.getElementsByName('hobby');
        const profileImg = this.uploadProfileImg().then((data) => data);

        console.log('profileImg', profileImg);

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

        return this.DataService.updateUser(
            selectedUser,
            updatePass,
            updateFirstName,
            updateSurname,
            updateCountry,
            updateBirthday,
            selectedGender,
            selectedHobbies,
            profileImg
        );
    }

    async uploadProfileImg() {
        // const username = document.getElementById('profileName').innerHTML.trim();
        // console.log('username', username);
        const file = document.getElementById('imageInput');
        const formData = new FormData();
        formData.append('profileImg', file.files[0]);

        let url = 'http://localhost:3000/upload';
        let options = { method: 'POST', body: formData };

        const response = await fetch(url, options);
        const data = await response.json();
        return data.filename;

        // let response = fetch(url, {
        //     method: 'POST',
        //     body: formData,
        // });

        // let data = response.json();
        // return data.filename;
    }

    $submitBtn(event) {
        if (event.target.matches('#submitBtn')) {
            event.preventDefault();
            this.updateData();
            // this.uploadProfileImg();
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

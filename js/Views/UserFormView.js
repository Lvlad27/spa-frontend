import BaseView from './BaseView.js';

class UserFormView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('UserFormView');

        document.addEventListener('submit', this.$submitBtn.bind(this));
        // document.addEventListener('click', this.$readFile.bind(this));
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
            updateBirthday = document.getElementById('birthday').value.trim();
        const updateGender = document.getElementsByName('gender');

        let selectedGender = [];
        updateGender.forEach((index) => {
            if (index.checked) {
                selectedGender.push(index.value);
            }
        });

        const updateHobbies = document.getElementsByName('hobby');
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
            selectedHobbies
        );
    }

    async uploadProfileImg(event) {
        const file = document.getElementById('imageInput');
        const formData = new FormData();
        formData.append('profileImg', file.files[0]);

        let url = 'http://localhost:3000/upload';

        await fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((result) => console.log('Success: ', result))
            .catch((error) => console.error('Error: ', error));
    }

    $submitBtn(event) {
        if (event.target.matches('#submitBtn')) {
            event.preventDefault();
            this.updateData();
            this.uploadProfileImg(event);
            window.router.goTo('#userlist');
        }
    }
}

export default UserFormView;

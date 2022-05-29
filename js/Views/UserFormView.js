import BaseView from './BaseView.js';

class UserFormView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('UserFormView');

        document.addEventListener('click', this.$cancelBtn.bind(this));
        document.addEventListener('click', this.$submitBtn.bind(this));
        document.addEventListener('change', this.$fileInput.bind(this));
    }

    async getData(param) {
        const name = param;
        const data = await this.DataService.getUser(name);
        return data;
    }

    async updateData() {
        const selectedUser = document.getElementById('emailInput').value.trim(),
            updateFirstName = document.getElementById('firstName').value.trim(),
            updateSurname = document.getElementById('surname').value.trim(),
            updateCountry = document.getElementById('country').value.trim(),
            updateBirthday = document.getElementById('birthday').value.trim(),
            updateGender = document.getElementsByName('gender'),
            updateHobbies = document.getElementsByName('hobby');
        let imgName;

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

        const file = document.getElementById('imageInput');
        const formData = new FormData();
        formData.append('profileImg', file.files[0]);

        if (file.files[0]) {
            imgName = await this.DataService.getProfileImg(formData);
        } else if (!file.files[0]) {
            let userArray = await this.DataService.getUsers();
            userArray.forEach((element) => {
                if (element.userName === selectedUser) {
                    imgName = element.profileImgName;
                }
            });
            imgName;
        } else {
            imgName = '';
        }

        const id = await this.DataService._getUserId(selectedUser);

        const updatedUser = {
            id,
            updateFirstName,
            updateSurname,
            updateCountry,
            updateBirthday,
            selectedGender,
            selectedHobbies,
            imgName,
        };

        const update = await this.DataService.updateUser(updatedUser);
        return update;
    }

    $fileInput(event) {
        if (event.target.matches('#imageInput')) {
            const file = event.files;
            if (file) {
                imageId.src = URL.createObjectURL(file);
            }
        }
    }

    async $submitBtn(event) {
        if (event.target.matches('#submitBtn')) {
            event.preventDefault();
            await this.updateData();
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

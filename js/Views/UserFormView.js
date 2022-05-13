import BaseView from './BaseView.js';

class UserFormView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('UserFormView');

        document.addEventListener('click', this.$submitBtn.bind(this));
        // document.addEventListener('click', this.$readFile.bind(this));
    }

    getData(param) {
        const name = param;
        return this.DataService.getUser(name);
    }

    $submitBtn(event) {
        if (event.target.matches('#submitBtn')) {
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
                    selectedGender = index.value;
                }
            });

            const updateHobbies = document.getElementsByName('hobby');
            let selectedHobbies = [];
            updateHobbies.forEach((index) => {
                if (index.checked) {
                    selectedHobbies.push(index.value);
                }
            });

            this.DataService.updateUser(
                selectedUser,
                updatePass,
                updateFirstName,
                updateSurname,
                updateCountry,
                updateBirthday,
                selectedGender,
                selectedHobbies
            );
            window.router.goTo('#userlist');
        }
    }

    // $readFile(event) {
    //     const file = document.getElementById('imageInput');
    //     const output = document.getElementById('uplProgress');

    //     if (event.target.matches('#imageInput')) {
    //         const fileReader = new FileReader();
    //         const imageMeta = file.files[0];
    //         fileReader.onloadend = (event) => {
    //             console.log('Read successfully!');
    //         };
    //         fileReader.readAsArrayBuffer(imageMeta);
    //     }
    // }
}

export default UserFormView;

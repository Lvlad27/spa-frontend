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

    uploadProfileImg(event) {
        const file = document.getElementById('imageInput');
        const formData = new FormData();
        formData.append('file', file.files[0]);
        console.log('formData', formData);

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            mode: 'no-cors',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('data', data.filename);
            })
            .catch((error) => console.log('ERROR'));
    }

    getProfileImg(event) {
        const imgContainer = document.getElementById('imgContainer');

        fetch(`http://localhost:3000/upload`, {
            method: 'GET',
            mode: 'no-cors',
        })
            .then((res) => {
                console.log('res.json', res.text());
                return res.json();
            })
            .then((data) => console.log('data', data))
            .catch((error) => console.log('ERROR'));
        //     .then((data) => {
        //         console.log('data.filename', data.filename);
        //         return data.filename;
        //     });

        // imgContainer.innerHTML = `
        //     <img
        //         src="/uploads/${data.filename}"
        //         alt="Profile picture"
        //         class="profile-picture"
        //     />`;
    }

    $submitBtn(event) {
        if (event.target.matches('#userdataForm')) {
            event.preventDefault();
            this.updateData();
            this.uploadProfileImg(event);
            // this.getProfileImg(event);
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

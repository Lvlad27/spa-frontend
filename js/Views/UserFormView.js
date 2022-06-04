import BaseView from './BaseView.js';

class UserFormView extends BaseView {
    constructor(DataService, templateRenderer) {
        super(DataService, templateRenderer);
        this.template = document.getElementById('UserFormView');

        document.addEventListener('click', this.$cancelBtn.bind(this));
        document.addEventListener('click', this.$submitBtn.bind(this));
        // document.addEventListener('change', this.$fileInput.bind(this));
        document.addEventListener('change', this.$postImgInput.bind(this));
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
            imgName = await this.DataService.upload(formData, 'uploadProfileImg');
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

    async reqPost() {
        const selectedUser = document.getElementById('emailInput').value.trim(),
            file = document.getElementById('postImageInput'),
            userId = await this.DataService._getUserId(selectedUser),
            formData = new FormData();
        formData.append('postImageInput', file.files[0]);
        formData.append('userId', userId);

        const postName = await this.DataService.upload(formData, 'posts/upload');
        return postName;
    }

    renderPost(postName) {
        const addPostDiv = document.getElementById('addPostDiv');
        const html = `
        <div class="post">
            <img
                src="http://localhost:3000/dataService/posts/{{${postName}}}"
                alt=""
                class="post-picture"
            />
            <div class="post-options-container">
                <label for="editPostImgInput">
                    <i class="fas fas far fa-edit" title="Edit post"></i>
                </label>
                <input
                    class="image-input"
                    name="editPostImgInput"
                    id="editPostImgInput"
                    type="file"
                    accept="image/*"
                />
                <button
                    type="button"
                    class="post-options"
                    id="deletePostBtn"
                    title="Delete post"
                >
                    <i class="fas fas far fas fa-window-close"></i>
                </button>
            </div>
        </div>`;
        addPostDiv.before(html);
    }

    async $deletePostBtn(event) {}
    async $uploadPost(event) {}

    // $avatarImgInput(event) {
    //     if (event.target.matches('#postImageInput')) {
    //         const file = event.files;
    //         if (file) {
    //             imageId.src = URL.createObjectURL(file);
    //         }
    //     }
    // }

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

    $postImgInput(event) {
        if (event.target.matches('#postImageInput')) {
            this.reqPost();
        }
    }
}

export default UserFormView;

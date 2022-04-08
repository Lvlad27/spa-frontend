class FormValidation {
    constructor(form, formInputs) {
        this.form = form;
        this.formInputs = formInputs;

        this.validateOnEntry();
        this.validateOnSubmit();
    }

    setStatus(indexInput, message, status) {
        const errorIcon = indexInput.parentElement.querySelector('.error-icon'),
            successIcon = indexInput.parentElement.querySelector('.success-icon'),
            errorMessage = indexInput.parentElement.querySelector('.error-message');

        if (status === 'success') {
            if (errorIcon) {
                errorIcon.classList.add('hide-element');
            }
            if (errorMessage) {
                errorMessage.innerText = '';
            }
            successIcon.classList.remove('hide-element');
            indexInput.classList.remove('input-error');
        }

        if (status === 'error') {
            if (successIcon) {
                successIcon.classList.add('hide-element');
            }
            let container = indexInput.parentElement;
            container.append(document.createElement('small'));
            errorMessage.classList.add('error-message');
            indexInput.parentElement.querySelector('.error-message').innerText = message;
            errorIcon.classList.remove('hide-element');
            indexInput.classList.add('input-error');
        }
    }

    validateFormInputs(formInput) {
        // Check if any values exist
        if (formInput.value.trim() === '') {
            this.setStatus(formInput, `Please fill in ${formInput.placeholder}`, 'error');
            formInput.style.borderBottom = '2px #ff6188 solid';
        } else {
            this.setStatus(formInput, null, 'success');
        }

        // Check for a valid email address
        if (formInput.type === 'text') {
            const mailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (mailRegEx.test(formInput.value)) {
                this.setStatus(formInput, null, 'success');
                formInput.style.borderBottom = '2px #ff6188 solid';
            } else {
                this.setStatus(formInput, 'Please enter valid email address', 'error');
                formInput.style.borderBottom = '2px #ff6188 solid';
            }
        }

        // Check for valid password
        if (formInput.type === 'password') {
            const min = 3,
                stringOne = 'Should contain at least a digit and a letter',
                stringTwo = `Should contain at least ${min} characters`,
                regexOne = /^(?=.*[a-zA-Z]).{0,3}$/,
                regexTwo = /^(?=.*[a-zA-Z]).{3,}$/,
                regexThree = /(?=.*[0-9]).{0,3}$/,
                regexFour = /(?=.*[0-9]).{3,}$/,
                regexFive = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+).{0,3}$/,
                regexSix = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+).{2,}$/;

            // case1 - only letters and less than 3
            // case3 - only numbers and less than 3
            if (regexOne.test(formInput.value) || regexThree.test(formInput.value)) {
                this.setStatus(formInput, `${stringOne}\n${stringTwo}`, 'error');
                formInput.style.borderBottom = '2px #ff6188 solid';
            }

            // case2 - only letters and more than 3
            // case4 - only numbers and more than 3
            if (regexTwo.test(formInput.value) || regexFour.test(formInput.value)) {
                this.setStatus(formInput, `${stringOne}`, 'error');
                formInput.style.borderBottom = '2px #ff6188 solid';
            }

            // case5 - smaller than 3 but with numbers and letters
            if (regexFive.test(formInput.value)) {
                this.setStatus(formInput, `${stringTwo}`, 'error');
                formInput.style.borderBottom = '2px #ff6188 solid';
            }

            // case6 - success
            if (regexSix.test(formInput.value)) {
                this.setStatus(formInput, null, 'success');
                formInput.style.borderBottom = '2px #a9dc76 solid';
            }
        }

        // Check for password confirmation
        if (formInput.id === 'passwordConfirm') {
            const passwordInput = this.form.querySelector('#signUpPass');
            console.log(this.form);
            if (formInput.value.trim() == '') {
                this.setStatus(formInput, 'Confirmation required', 'error');
                formInput.style.borderBottom = '2px #ff6188 solid';
            } else if (formInput.value !== passwordInput.value) {
                this.setStatus(formInput, "Password doesn't match", 'error');
                formInput.style.borderBottom = '2px #ff6188 solid';
            } else {
                this.setStatus(formInput, null, 'success');
            }
        }
    }

    validateOnEntry() {
        this.formInputs.forEach(index => {
            const input = document.querySelector(`#${index}`);
            input.addEventListener(
                'input',
                function () {
                    this.validateFormInputs(input);
                }.bind(this)
            );
        });
    }

    validateOnSubmit() {
        this.form.addEventListener(
            'submit',
            function (e) {
                e.preventDefault();
                this.formInputs.forEach(index => {
                    const input = document.querySelector(`#${index}`);
                    this.validateFormInputs(input);
                });
            }.bind(this)
        );
    }
}

export default FormValidation;

class FormValidation {
    constructor(form, formInputs) {
        this.form = form;
        this.formInputs = formInputs;

        this.validateOnEntry();
        this.validateOnSubmit();

        console.log(formInputs);
    }

    initialize() {}

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
        const min = 3;
        const mailRegEx = /\S+@\S+\.\S+/;

        // Check if any values exist
        if (formInput.value.trim() === '') {
            // console.log(formInput);
            console.log(formInput.previousElementSibling);

            this.setStatus(
                formInput,
                `${formInput.previousElementSibling.innerText} can't be blank`,
                'error'
            );
        } else {
            this.setStatus(formInput, null, 'success');
        }

        // Check for a valid email address
        if (formInput.type === 'email') {
            if (mailRegEx.test(formInput.value)) {
                this.setStatus(formInput, null, 'success');
            } else {
                this.setStatus(formInput, 'Please enter valid email address', 'error');
            }
        }

        // Check for valid password
        if (formInput.type === 'password') {
            if (!passwordRegEx.test(formInputs.value)) {
                this.setStatus(formInput, `Must contain at least one number and letter`, 'error');
            } else if (formInput.value < min) {
                this.setStatus(formInput, `Must contain at least ${min} characters`, 'error');
            } else {
                this.setStatus(formInput, null, 'success');
            }
        }

        // Check for password confirmation
        if (formInput.id === 'passwordConfirm') {
            if (formInput.value.trim() == '') {
                this.setStatus(formInput, 'Confirmation required', 'error');
            } else if (formInput.value != password.value) {
                this.setStatus(formInput, "Doesn't match", 'error');
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

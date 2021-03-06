class FormValidation {
    constructor(form, formInputs) {
        this.form = form;
        this.formInputs = formInputs;

        this.validateOnEntry();
    }

    validateOnEntry() {
        this.formInputs.forEach((index) => {
            let input = document.querySelector(`#${index}`);
            input.addEventListener(
                'input',
                function () {
                    this.validateRegistrationInputs(input);
                }.bind(this)
            );
        });
    }

    validateOnSubmit(formInputs) {
        let inputState = [];
        for (let i = 0; i < formInputs.length; i++) {
            let input = document.querySelector(`#${formInputs[i]}`);
            inputState.push(this.validateRegistrationInputs(input));
        }
        let formState = inputState.every((index) => index === true);
        return formState;
    }

    // This functions receives an input and returns true if one condition returns true.
    validateRegistrationInputs(formInput) {
        // Check if any values exist
        const noValuesCheck = () => {
            if (formInput.value.trim() === '') {
                this.setInputStatus(formInput, `Please fill in ${formInput.placeholder}`, 'error');
            } else {
                this.setInputStatus(formInput, null, 'success');
                return true;
            }
        };

        // Check for a valid email address
        const emailCheck = () => {
            if (formInput.type === 'text') {
                const mailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (mailRegEx.test(formInput.value)) {
                    this.setInputStatus(formInput, null, 'success');
                    return true;
                } else {
                    this.setInputStatus(formInput, 'Please enter valid email address', 'error');
                }
            }
        };

        // Check for valid sign up password
        const passCheck = () => {
            if (formInput.type === 'password') {
                let stringOne = 'Should contain at least a digit and a letter',
                    stringTwo = `Should contain at least 3 characters`,
                    regexOne = /^(?=.*[a-zA-Z]).{0,3}$/,
                    regexTwo = /^(?=.*[a-zA-Z]).{3,}$/,
                    regexThree = /(?=.*[0-9]).{0,3}$/,
                    regexFour = /(?=.*[0-9]).{3,}$/,
                    regexFive = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+).{0,3}$/,
                    regexSix = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+).{2,}$/;

                // case1 - only letters and less than 3
                // case3 - only numbers and less than 3
                if (regexOne.test(formInput.value) || regexThree.test(formInput.value)) {
                    this.setInputStatus(formInput, `${stringOne}\n${stringTwo}`, 'error');
                }

                // case2 - only letters and more than 3
                // case4 - only numbers and more than 3
                if (regexTwo.test(formInput.value) || regexFour.test(formInput.value)) {
                    this.setInputStatus(formInput, `${stringOne}`, 'error');
                }

                // case5 - smaller than 3 but with numbers and letters
                if (regexFive.test(formInput.value)) {
                    this.setInputStatus(formInput, `${stringTwo}`, 'error');
                }

                // case6 - success
                if (regexSix.test(formInput.value)) {
                    this.setInputStatus(formInput, null, 'success');

                    return true;
                }
            }
        };

        // Check for password confirmation
        const passConfirmCheck = () => {
            if (formInput.id === 'passwordConfirm') {
                let passwordInput = this.form.querySelector('#signUpPass');
                if (formInput.value.trim() == '') {
                    this.setInputStatus(formInput, 'Confirmation required', 'error');
                } else if (formInput.value !== passwordInput.value) {
                    this.setInputStatus(formInput, "Password doesn't match", 'error');
                } else {
                    this.setInputStatus(formInput, null, 'success');
                    return true;
                }
            }
        };

        // Check for valid login password
        let conditions = [emailCheck(), passCheck(), passConfirmCheck()];

        // Check for no values condition first
        noValuesCheck();

        // If there are input values entered, return true if for a given input any one condition is true.
        if (noValuesCheck()) {
            emailCheck(), passCheck(), passConfirmCheck();

            let isValid = conditions.some((condition) => condition == true);
            return isValid;
        } else {
            return false;
        }
    }

    setInputStatus(indexInput, message, status) {
        let errorIcon = indexInput.parentElement.querySelector('.error-icon'),
            successIcon = indexInput.parentElement.querySelector('.success-icon'),
            errorMessage = indexInput.parentElement.querySelector('.error-message');

        const successState = () => {
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
        };

        const errorState = () => {
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
        };

        successState();
        errorState();
    }
}

export default FormValidation;

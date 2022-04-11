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

    validateFormInputs(formInput) {
        // Check if any values exist
        const noValuesCheck = () => {
            if (formInput.value.trim() === '') {
                this.setStatus(formInput, `Please fill in ${formInput.placeholder}`, 'error');
                formInput.style.borderBottom = '2px #ff6188 solid';
            } else {
                this.setStatus(formInput, null, 'success');
                // console.log(true);
                return true;
            }
        };

        // Check for a valid email address

        const emailCheck = () => {
            if (formInput.type === 'text') {
                const mailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (mailRegEx.test(formInput.value)) {
                    this.setStatus(formInput, null, 'success');
                    formInput.style.borderBottom = '2px #ff6188 solid';
                    // console.log(true);
                    return true;
                } else {
                    this.setStatus(formInput, 'Please enter valid email address', 'error');
                    formInput.style.borderBottom = '2px #ff6188 solid';
                }
            }
        };

        // Check for valid sign up password
        const passCheck = () => {
            if (formInput.type === 'password') {
                const stringOne = 'Should contain at least a digit and a letter',
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
                    // console.log(true);
                    return true;
                }
            }

            /*if (!l1 || !l2 || !l3) {
                return false;
            } else return true;

            if (!(l1 && l2 && l3)) return false;
            else return true;

            return l1 && l2 && l3;*/
        };

        // Check for password confirmation
        const passConfirmCheck = () => {
            if (formInput.id === 'passwordConfirm') {
                const passwordInput = this.form.querySelector('#signUpPass');
                if (formInput.value.trim() == '') {
                    this.setStatus(formInput, 'Confirmation required', 'error');
                    formInput.style.borderBottom = '2px #ff6188 solid';
                } else if (formInput.value !== passwordInput.value) {
                    this.setStatus(formInput, "Password doesn't match", 'error');
                    formInput.style.borderBottom = '2px #ff6188 solid';
                } else {
                    this.setStatus(formInput, null, 'success');
                    // console.log(true);
                    return true;
                }
            }
        };

        // Check for valid login password
        const loginPassCheck = () => {
            if (formInput.type === 'password' && formInput.id === 'loginPassword') {
                if (formInput.value.trim() === '') {
                    this.setStatus(formInput, `Please fill in ${formInput.placeholder}`, 'error');
                    formInput.style.borderBottom = '2px #ff6188 solid';
                } else {
                    this.setStatus(formInput, null, 'success');
                    // console.log(true);
                    return true;
                }
            }
        };

        noValuesCheck();
        emailCheck();
        passCheck();
        passConfirmCheck();
        loginPassCheck();

        const state =
            noValuesCheck() &&
            emailCheck() &&
            passCheck() &&
            passConfirmCheck() &&
            loginPassCheck();

        console.log(state);

        if (state) {
            console.log('good');
            return state;
        }

        //     let result = true;

        //     const conditions = [
        //         noValuesCheck(),
        //         emailCheck(),
        //         passCheck(),
        //         passConfirmCheck(),
        //         loginPassCheck(),
        //     ];

        //     for (let i = 0; i < conditions.length; i++) {
        //         result = result && conditions[i];
        //     }

        //     console.log(result);
        //     return result;
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

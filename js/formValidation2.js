class FormValidation {
    constructor(form, formInputs) {
        this.form = form;
        this.formInputs = formInputs;
    }

    validateOnSubmit() {
        // if(result)
        this.form.addEventListener(
            'submit',
            function (e) {
                e.preventDefault();

                this.formInputs.forEach(index => {
                    const input = document.querySelector(`#${index}`);
                    this.validationRules(input);
                });
            }.bind(this)
        );
    }

    validateOnEntry() {
        this.formInputs.forEach(index => {
            const input = document.querySelector(`#${index}`);
            input.addEventListener(
                'input',
                function () {
                    this.validationRules(input);
                }.bind(this)
            );
        });
    }

    validationState() {
        conditions.every(condition => condition == true);

        // this.formInputs.forEach(index => {
        //     const input = document.querySelector(`#${index}`);
        //     console.log(this.validationRules(input));
        // });
    }

    validationRules(formInput) {
        const emptyInputsCheck = () => {
            return formInput.value.trim() === '';
        };

        const emailCheck = () => {
            const mailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return formInput.test(mailRegEx);
        };

        const passwordCheck = () => {
            const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+).{2,}$/;
            return formInput.test(passwordRegex);
        };

        const passwordConfirm = () => {
            const passwordInput = this.form.querySelector('#signUpPass');
            const passwordConfirm = this.form.querySelector('#passwordConfirm');
            return passwordInput === passwordConfirm;
        };

        const conditions = [emptyInputsCheck(), emailCheck(), passwordCheck(), passwordConfirm()];

        return conditions;
    }

    setStatus(formInput, message, status) {
        const errorIcon = formInput.parentElement.querySelector('.error-icon'),
            successIcon = formInput.parentElement.querySelector('.success-icon'),
            errorMessage = formInput.parentElement.querySelector('.error-message');

        const successState = () => {
            if (status === 'success') {
                if (errorIcon) {
                    errorIcon.classList.add('hide-element');
                }
                if (errorMessage) {
                    errorMessage.innerText = '';
                }
                successIcon.classList.remove('hide-element');
                formInput.classList.remove('input-error');
            }
        };

        const errorState = () => {
            if (status === 'error') {
                if (successIcon) {
                    successIcon.classList.add('hide-element');
                }
                let container = formInput.parentElement;
                container.append(document.createElement('small'));
                errorMessage.classList.add('error-message');
                formInput.parentElement.querySelector('.error-message').innerText = message;
                errorIcon.classList.remove('hide-element');
                formInput.classList.add('input-error');
            }
        };

        successState();
        errorState();
    }
}

export default FormValidation;

import { errorIcon, errorMessage, successIcon } from './app';

class FormValidation {
    constructor(form, formInput) {
        this.form = form;
        this.formInput = formInput;
    }

    initialize() {
        this.validateOnEntry();
        this.validateOnSubmit();
    }

    validateFormInput(formInput) {
        // Check if any values exist
        if (formInput.value.trim() === '') {
            this.setStatus;
        }
    }

    setStatus(formInput, message, status) {
        if (status === 'success') {
            if (errorIcon) {
                errorIcon.classList.add('hidden-item');
            }
            if (errorMessage) {
                errorMessage.innerText = '';
            }
            successIcon.classList.remove('hidden-item');
            formInput.classList.remove('input-error');
        }

        if (status === 'error') {
            if (successIcon) {
                successIcon.classList.add('hidden-item');
            }
            formInput.parentElement.querySelector('.error-message').innerText = message;
            errorIcon.classList.remove('hidden');
            formInput.classList.add('input-error');
        }
    }
}

export default FormValidation;

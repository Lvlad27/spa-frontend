import { BaseView } from './BaseView.js';
import { VALIDATIONS } from './../Validations.js';

export class BaseForm extends BaseView {
    constructor(DataStorage, templateRenderer) {
        super(DataStorage, templateRenderer);
        document.addEventListener('click', this.showPassword);
    }

    showPassword(event) {
        if (event.target.matches('.show-password')) {
            const passwordInputElement = event.target.previousElementSibling;
            if (passwordInputElement.type === 'password') {
                passwordInputElement.type = 'text';
                event.target.innerText = 'Hide';
            } else {
                passwordInputElement.type = 'password';
                event.target.innerText = 'Show';
            }
        }
    }
    validateForm(inputs) {
        let formIsValid = true;
        inputs.forEach((input) => {
            const validationFunctions = getInputValidationFunctions(input);

            validationFunctions.forEach((validation) => {
                toggleErrorMessage(
                    input.closest('.form-input'),
                    validation.validationFunction,
                    'remove'
                );
                const isValid = VALIDATIONS[validation.validationFunction](
                    input.value,
                    validation.parameters
                );
                if (!isValid) {
                    toggleErrorMessage(
                        input.closest('.form-input'),
                        validation.validationFunction,
                        'add'
                    );
                    input.classList.add('invalid-input');
                    formIsValid = false;
                }
            });
        });

        function getInputValidationFunctions(input) {
            const validationFunctions = [];
            input.dataset.validations.split(', ').map((validator) => {
                const validationFunction = validator.split('(')[0];
                const parameters = validator.split(/[()]/)[1];
                validationFunctions.push({ validationFunction, parameters });
            });
            return validationFunctions;
        }
        function toggleErrorMessage(element, validationFunction, action) {
            if (action === 'add') {
                element.classList.add(`error-message--${validationFunction}`);
            } else if (action === 'remove') {
                element.classList.remove(`error-message--${validationFunction}`);
            }
        }
        return formIsValid;
    }
    removeRedBorders() {
        const errorInputs = document.getElementsByClassName('invalid-input');
        while (errorInputs.length > 0) {
            errorInputs[0].classList.remove('invalid-input');
        }
    }
}

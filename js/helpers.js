export const id = (id) => document.getElementById(id);

export const loginFormContainer = id('loginAccount'),
    registerFormContainer = id('registerAccount');

export function templateRenderer(template, data) {
    return template.replace(/{{(.*?)}}/g, (match) => {
        return data[match.split(/{{|}}/).filter(Boolean)[0]];
    });
}

// export function animateFadeIn(element) {
//     element.classList.remove('FadeOut');
//     element.classList.add('FadeIn');
// }

// export function animateFadeOut(element) {
//     element.classList.remove('FadeIn');
//     element.classList.add('FadeOut');
// }

// export function hideForm(formName) {
//     formName.classList.add('hide-element');
// }

// export function showForm(formName) {
//     formName.classList.remove('hide-element');
// }

export const id = (id) => document.getElementById(id);

export const loginFormContainer = id('loginAccount'),
    registerFormContainer = id('registerAccount');

export function templateRenderer(template, data) {
    return template.replace(/{{(.*?)}}/g, (match) => {
        return data[match.split(/{{|}}/).filter(Boolean)[0]];
    });
}

export function fadeIn(element) {
    element.classList.remove('FadeOut');
    element.classList.add('FadeIn');
}

export function fadeOut(element) {
    element.classList.remove('FadeIn');
    element.classList.add('FadeOut');
}

export function hide(element) {
    element.classList.add('hide-element');
}

export function show(element) {
    element.classList.remove('hide-element');
}

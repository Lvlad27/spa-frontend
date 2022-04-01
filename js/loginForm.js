const labels = document.querySelectorAll('.form__login-control label');

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map(
            (letter, index) =>
                `<span style="transition-delay:${
                    index * 20
                }ms">${letter}</span>`
        )
        .join('');
});

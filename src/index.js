const overlay = document.querySelector('.overlay')
const fieldsContainer = document.querySelector('.passwords-list__password-elems')

//btns
const closeOverlay = document.querySelector('.form__close')
const addBtn = document.getElementById('new-line')
const saveFormBtn = document.getElementById('save')
const generatePasswordBtn = document.querySelector('.form__generate-btn')

//password for localStorage
let userPasswords = []

//btns event
addBtn.addEventListener('click', ()=>{showOverlay(true)})
closeOverlay.addEventListener('click', ()=>{showOverlay(false)})
saveFormBtn.addEventListener('click', () => {addNewPassword()})
generatePasswordBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const passwordDifficulty = document.getElementById('difficult').value
    generatePasswordByDifficulty(passwordDifficulty)
})

window.addEventListener('DOMContentLoaded', () => {
    init()
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('dist/service-worker.js')
            .then((registration) => {
                console.log('Сервис-воркер успешно зарегистрирован:', registration);
            })
            .catch((error) => {
                console.log('Ошибка при регистрации сервис-воркера:', error);
            });
    }
});

function init(){
    if (localStorage.getItem('passwords')){
        fillContent()
    }
}

function fillContent(){
    userPasswords = JSON.parse(localStorage.getItem('passwords'))
    userPasswords.forEach( ob => {
        const container = createFieldsContainer()
        for(let key in ob){
            const field= createField(ob[key], key)
            container.appendChild(field)
        }
        fieldsContainer.appendChild(container)
    })
}

function createFieldsContainer(){
    const container = document.createElement('div')
    container.classList.add('passwords-list__password-elem')
    return container
}

function createField(content, key){
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('readonly', 'true')
    input.setAttribute('name', `${key}`)
    input.setAttribute('value', `${content}`)
    input.classList.add('input-field')
    const fieldName = document.createElement('p')
    fieldName.classList.add('passwords-list__field-name')
    fieldName.textContent = `${key}`
    const fieldContainer = document.createElement('div')
    fieldContainer.classList.add('passwords-list__field')
    fieldContainer.appendChild(fieldName)
    fieldContainer.appendChild(input)
    return fieldContainer
}

function showOverlay(flag){
    if (flag){
        overlay.style.opacity = '1'
        overlay.style.zIndex = '1'
    } else {
        overlay.style.opacity = '0'
        overlay.style.zIndex = '-1'
    }
}

function addNewPassword(){
    const inputs = document.querySelectorAll('.form__input-field')
    if (fieldsCheck(inputs)){
        let newPassword = {}
        inputs.forEach(e => {
            newPassword[e.name] = e.value
        })
        userPasswords.push(newPassword)
        localStorage.setItem('passwords', JSON.stringify(userPasswords))
    } else {
        alert('Все поля должны быть заполнены!')
    }
}

function fieldsCheck(fields){
    for(field of fields){
        if (!field.value){
            return false
        }
    }
    return true
}

function generatePasswordByDifficulty(difficulty) {
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_-+=<>?';

    let charPool = {};

    const passwordLength = 12;
    let password = '';

    const passwordField = document.getElementById('password')

    switch (difficulty) {
        case 'easy':
            charPool['lowerCase'] = lowerCaseChars;
            charPool['upperCase'] = upperCaseChars;
            break;
        case 'medium':
            charPool['lowerCase'] = lowerCaseChars;
            charPool['upperCase'] = upperCaseChars;
            charPool['numbers'] = numbers;
            break;
        case 'hard':
            charPool['lowerCase'] = lowerCaseChars;
            charPool['upperCase'] = upperCaseChars;
            charPool['numbers'] = numbers;
            charPool['symbols'] = specialChars;
            break;
        default:
            throw new Error('Значения сложности могут быть только: easy, medium, hard');
    }

    for(let key in charPool){
        for(let i = 0; i < passwordLength/Object.keys(charPool).length; i++){
            const randomIndex = Math.floor(Math.random() * charPool[key].length);
            password += charPool[key][randomIndex]
        }
    }

    let arr = password.split('');

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    password = arr.join('');

    passwordField.value = password
}
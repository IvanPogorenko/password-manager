const overlay = document.querySelector('.overlay')
const fieldsContainer = document.querySelector('.passwords-list__password-elems')

//btns
const closeOverlay = document.querySelector('.form__close')
const addBtn = document.getElementById('new-line')
const saveFormBtn = document.getElementById('save')

//password for localStorage
let userPasswords = []

//btns event
addBtn.addEventListener('click', ()=>{showOverlay(true)})
closeOverlay.addEventListener('click', ()=>{showOverlay(false)})
saveFormBtn.addEventListener('click', () => {addNewPassword()})

window.addEventListener('DOMContentLoaded', () => {init()});

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
    input.setAttribute('disabled', 'true')
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
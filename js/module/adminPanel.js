const generatePassButton = document.querySelector('#generatePassButton');
const uname = document.querySelector('input[name = uname]');
const pass = document.querySelector('input[name = pass]');
const role = document.querySelector('#role');
const msg = document.querySelector('#msg');
const defaultOpen = document.querySelector('#defaultOpen');

defaultOpen.addEventListener('click', () => {
    document.location.reload(true);
})

generatePassButton.addEventListener('click', () => {
    pass.value = generatePassword();
});

const addUserButton = document.querySelector('#addUserButton');

addUserButton.addEventListener('click', async function(){
    msg.textContent = '';
    uname.className = '';
    pass.className = '';
    role.className = '';

    if (validate({uname, pass, role}, msg)) return null;

    let successInsert = await workWithBD('insertUser', 'moderRouter', {uname: uname.value, pass: pass.value, role: role.value});
    
    if (successInsert){
        msg.textContent = 'Дані успішно додано!';
        msg.className = 'success-msg';
    } else {
        msg.textContent = 'Помилка запису даних, спробуйте будьласка пізніше!';
        msg.className = 'error-msg';
    }

    uname.value = '';
    pass.value = '';
    role.value = '';
})

async function deleteFromDB(id){
    let successDelete = await workWithBD('deleteUser', 'moderRouter', {user_id: id});
    
    if(successDelete){
        document.location.reload(true);
    }
    
    return
}

function generatePassword() {
    let length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return retVal;
}

function validate(obj, msg){
    let countOfEmpty = 0;
    
    for (let element in obj){
        if (!obj[element].value){
            showError(obj[element], msg);
            countOfEmpty++;
        }
    }

    return countOfEmpty > 0;
}
 
function showError(inputElement, msgElement){
    msgElement.textContent = 'Заповніть пусті поля!';
    msgElement.className = 'error-msg';

    inputElement.className = 'error-input';

    return;
}
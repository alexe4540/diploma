const add = document.querySelector('#addButton');

add.addEventListener('click', async () => {
    let oname = document.querySelector('input[name=oname]'),
        longitude = document.querySelector('input[name=longitude]'),
        latitude = document.querySelector('input[name=latitude]'),
        wcount = document.querySelector('input[name=wcount]'),
        city = document.querySelector('input[name=city]'),
        msg = document.querySelector('#msg');

    msg.textContent = '';
    oname.className = '';
    longitude.className = '';
    latitude.className = '';
    wcount.className = '';
    city.className = '';

    if (validate({oname, longitude, latitude, wcount, city}, msg)) return null;

    let successInsert = await workWithBD('insert', 'moderRouter', {oname: oname.value, longitude: longitude.value, latitude: latitude.value, wcount: wcount.value, city: city.value});
    
    if (successInsert){
        msg.textContent = 'Дані успішно додано!';
        msg.className = 'success-msg';
    } else {
        msg.textContent = 'Помилка запису даних, спробуйте будьласка пізніше!';
        msg.className = 'error-msg';
    }

    oname.value = '';
    longitude.value = '';
    latitude.value = '';
    wcount.value = '';
    city.value = '';
    
    return;
})

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
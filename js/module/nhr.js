const   fname = document.querySelector('#fname'),
        substance = document.querySelector('#substance'),
        countSub = document.querySelector('input[name = countSub]'),
        wcount = document.querySelector('input[name = wcount]'),
        msg = document.querySelector('#msg'),
        calculateButton = document.querySelector("#calculateButton"),
        event = new Event('change');

fname.addEventListener('change', () => checkSelect(fname, 'Оберіть місце аварії!'));
substance.addEventListener('change', () => checkSelect(substance, 'Оберіть тип викинутої речовини!'));

countSub.addEventListener('change', () => {
    msg.textContent = '';
    msg.className = '';
    countSub.className = '';

    if(countSub.value < 0 || !countSub.value){
        msg.textContent = 'Кількість викинутої речовини не можебіти меньше нуля!';
        msg.className = 'error-msg';
        countSub.className = 'error-input';
        return false;
    }

    return true;
});

wcount.addEventListener('change', () => {
    msg.textContent = '';
    msg.className = '';
    wcount.className = '';

    if(wcount.value < 0 || wcount.value > 100 || !wcount.value){
        msg.textContent = 'Відсоток не може бути меньше за 0 або більше ніж 100!';
        msg.className = 'error-msg';
        wcount.className = 'error-input';
        return false;
    }

    return true;
});

calculateButton.addEventListener('click', () => {
    let resultSection = document.querySelector('#resultSection');
    resultSection.style.display = 'block';

    checkSelect(fname);
    checkSelect(substance);
    countSub.dispatchEvent(event);
    wcount.dispatchEvent(event);

    window.scrollTo(0, -200);

    if (!checkSelect(fname) || !checkSelect(substance) || !countSub.dispatchEvent(event) || !wcount.dispatchEvent(event)){
        msg.textContent = 'Заповніть усі поля вірно!';
        return;
    } 

    calculate(fname.value, substance.value, countSub.value, wcount.value);
})

function checkSelect(select, errMsg){
    msg.textContent = '';
    msg.className = '';
    select.className = '';

    if(select.value == 0) {
        msg.textContent = errMsg;
        msg.className = 'error-msg';
        select.className = 'error-input';
        return false;
    }

    return true;
}
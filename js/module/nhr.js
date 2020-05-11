const fname = document.querySelector('#fname'),
    substance = document.querySelector('#substance'),
    countSub = document.querySelector('input[name = countSub]'),
    wcount = document.querySelector('input[name = wcount]'),
    msg = document.querySelector('#msg'),
    calculateButton = document.querySelector("#calculateButton"),
    event = new Event('change');

let countCheck, wcountCheck;

fname.addEventListener('change', () => checkSelect(fname, 'Оберіть місце аварії!'));
substance.addEventListener('change', () => checkSelect(substance, 'Оберіть тип викинутої речовини!'));

countSub.addEventListener('change', () => {
    msg.textContent = '';
    msg.className = '';
    countSub.className = '';

    if (countSub.value < 0 || !countSub.value) {
        msg.textContent = 'Кількість викинутої речовини не може бути меньше нуля!';
        msg.className = 'error-msg';
        countSub.className = 'error-input';
        countCheck = false;
    }

    return true;
});

wcount.addEventListener('change', () => {
    msg.textContent = '';
    msg.className = '';
    wcount.className = '';

    if (wcount.value < 0 || wcount.value > 100 || !wcount.value) {
        msg.textContent = 'Відсоток не може бути меньше за 0 або більше ніж 100!';
        msg.className = 'error-msg';
        wcount.className = 'error-input';
        wcountCheck = false;
    }

    return true;
});

calculateButton.addEventListener('click', () => {
    let resultSection = document.querySelector('#resultSection');

    checkSelect(fname);
    checkSelect(substance);
    
    countSub.dispatchEvent(event);
    wcount.dispatchEvent(event);

    countCheck = true, wcountCheck = true;
    

    if (!checkSelect(fname) || !checkSelect(substance) || !countCheck || !wcountCheck) {
        msg.className = 'error-msg';
        msg.textContent = 'Заповніть усі поля вірно!';
        return false;
    }

    resultSection.style.display = 'block';
    window.scrollTo(0, -200); 
    calculate(fname.value, substance.value, countSub.value, wcount.value);
})

function checkSelect(select, errMsg) {
    msg.textContent = '';
    msg.className = '';
    select.className = '';

    if (select.value == 0) {
        msg.textContent = errMsg;
        msg.className = 'error-msg';
        select.className = 'error-input';
        return false;
    }

    return true;
}
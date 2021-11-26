const dateCheckbox = document.querySelector('#dateNow'),
    fdate = document.querySelector('input[name = fdate]'),
    fname = document.querySelector('#fname'),
    substance = document.querySelector('#substance'),
    countSub = document.querySelector('input[name = countSub]'),
    wcount = document.querySelector('input[name = wcount]'),
    msg = document.querySelector('#msg'),
    calculateButton = document.querySelector("#calculateButton"),
    saveButton = document.querySelector("#saveButton"),
    event = new Event('change');

let countIsValide = false, wcountIsValid = false, dateIsValide = false;

fname.addEventListener('change', () => checkSelect(fname, 'Оберіть місце аварії!'));
substance.addEventListener('change', () => checkSelect(substance, 'Оберіть тип викинутої речовини!'));

dateCheckbox.addEventListener('change', () => {
    if (dateCheckbox.checked) {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        fdate.value = now.toISOString().slice(0,16);
        fdate.disabled = true;
    } else {
        fdate.value = '';
        fdate.disabled = false;
    }
})

fdate.addEventListener('change', () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);

    msg.textContent = '';
    msg.className = '';
    fdate.className = '';

    if (!fdate.value || maxDate.getTime() / 1000 < new Date(fdate.value).getTime() / 1000) {
        msg.textContent = 'Прогнозування більше чім на місяц вперед буде давати велику похибку! Оберіть дату в рамках найближчих 30 днів.';
        msg.className = 'error-msg';
        fdate.className = 'error-input';
        dateIsValide = false;
    } else {
        dateIsValide = true;
    }

    return true;
});

countSub.addEventListener('change', () => {
    msg.textContent = '';
    msg.className = '';
    countSub.className = '';

    if (countSub.value < 0 || !countSub.value) {
        msg.textContent = 'Кількість викинутої речовини не може бути меньше нуля!';
        msg.className = 'error-msg';
        countSub.className = 'error-input';
        countIsValide = false;
    } else {
        countIsValide = true;
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
        wcountIsValid = false;
    } else {
        wcountIsValid = true;
    }

    return true;
});

calculateButton.addEventListener('click', () => {
    let resultSection = document.querySelector('#resultSection');

    const fnameIsValid = checkSelect(fname);
    const substanceIsValid = checkSelect(substance);
    
    fdate.dispatchEvent(event);
    countSub.dispatchEvent(event);
    wcount.dispatchEvent(event);

    if (!dateIsValide || !fnameIsValid || !substanceIsValid || !countIsValide || !wcountIsValid) {
        msg.className = 'error-msg';
        msg.textContent = 'Заповніть усі поля вірно!';

        return false;
    }

    window.scrollTo(0, -200); 
    calculate(fname.value, substance.value, countSub.value, wcount.value, fdate.value);
    setTimeout(() => {
        resultSection.style.display = 'block';
    }, 2000);
});


saveButton.addEventListener('click', async function() {
    const cnvs = document.querySelector("canvas")

    let imageName = getRandomString() + '.png';
    let imageDataURL = cnvs.toDataURL('image/png');

    let resultImgSave = await apiRequest('saveImg', 'imgRouter', {img_name: imageName, img_data_url: imageDataURL});
    let resultDBSave = await apiRequest('saveNHRInitData', 'initDataRouter', {
        id_cat_type: 1,
        cat_date: fdate.value,
        zone_pic: imageName,
        f_id: fname.value,
        nhr_name: substance.value,
        nhr_quantity: countSub.value,
        prov_gas_mask: wcount.value,
    });

    if(resultImgSave && resultDBSave) {
        alert("Дані успішно збережені");
    } else {
        alert("Помилка збереження даних");
    }
});

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

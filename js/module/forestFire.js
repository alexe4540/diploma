const inputType = document.querySelector("#inputType"),
    event = new Event('change');

let marker,
    msg = document.querySelector('#msg'),
    dateCheckbox = document.querySelector('#dateNow'),
    fdate = document.querySelector('input[name = fdate]'),
    latitude = document.querySelector("input[name = latitude]"),
    longitude = document.querySelector("input[name = longitude]"),
    fireType = document.querySelector("#fireType"),
    burnabilityClass = document.querySelector("#burnabilityClass"),
    avgHeghtCarbon = document.querySelector("#avgHeghtCarbon"),
    avgTreeDiameter = document.querySelector("#avgTreeDiameter"),
    startPerimeter = document.querySelector("input[name = startPerimeter]"),
    calc = document.querySelector('#calculateButton');

    let latitudeIsValide = false,
    longitudeIsValide = false,
    dateIsValide = false;

calc.addEventListener('click', () => {
    let resultSection = document.querySelector('#resultSection');

    msg.textContent = '';
    msg.className = '';
    latitude.dispatchEvent(event);
    longitude.dispatchEvent(event);
    fdate.dispatchEvent(event);
   
   let fireIsValide = checkSelect(fireType);
   let burnabilityClassIsValide = checkSelect(burnabilityClass);
   let avgHeghtCarbonIsValide = checkSelect(avgHeghtCarbon);
   let avgTreeDiameterIsValide = checkSelect(avgTreeDiameter);
   let startPerimeterIsValide = checkSelect(startPerimeter);

    if (!dateIsValide || !latitudeIsValide || !longitudeIsValide || !fireIsValide || !burnabilityClassIsValide || !avgHeghtCarbonIsValide || !avgTreeDiameterIsValide || !startPerimeterIsValide) {
        msg.textContent = 'Усі поля повинні бути заповнені!';
        msg.className = 'error-msg';

        return false;
    }

    resultSection.style.display = 'block';

    window.scrollTo(0, -200);
    if (marker) map.removeLayer(marker);

    calculate(latitude.value, longitude.value, fireType.value, burnabilityClass.value, avgHeghtCarbon.value, avgTreeDiameter.value, startPerimeter.value, fdate.value);
});

startPerimeter.addEventListener('change', () => {
    msg.textContent = '';
    msg.className = '';

    if(startPerimeter.value < 0){
        msg.textContent = 'Периметр загорання не може бути меньше нуля!';
        msg.className = 'error-msg';
        startPerimeter.value = '';
        startPerimeter.className = 'error-input';
    }
})

inputType.addEventListener('change', function () {
    let inputTypeValue = inputType.value;
    switch (inputTypeValue) {
        case 'marker':
            drawMarker();
            break;
        case 'coordinates':
            moveToCoordinates();
            break;
        default:
            console.log('Ooooops...');
            break;
    }
});

latitude.addEventListener('change', () => {
    msg.textContent = '';
    msg.className = '';
    latitude.className = '';

    if (!latitude.value) {
        msg.className = 'error-msg';
        latitude.className = 'error-input';
        latitudeIsValide = false;
    } else {
        latitudeIsValide = true;
    }

    return true;
});

longitude.addEventListener('change', () => {
    msg.textContent = '';
    msg.className = '';
    longitude.className = '';

    if (!longitude.value) {
        msg.className = 'error-msg';
        longitude.className = 'error-input';
        longitudeIsValide = false;
    } else {
        longitudeIsValide = true;
    }

    return true;
});

dateCheckbox.addEventListener('change', () => {
    if (dateCheckbox.checked) {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        fdate.value = now.toISOString().slice(0, 16);
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

function drawMarker() {
    latitude.disabled = 'disabled';
    longitude.disabled = 'disabled';

    if (marker) map.removeLayer(marker);

    map.on('click', function (e) {
        if (marker) map.removeLayer(marker);
        map.setView([e.latlng.lat, e.latlng.lng], e._zoom);
        marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        alert("You clicked the map at " + e.latlng);

        latitude.value = e.latlng.lat;
        longitude.value = e.latlng.lng;
    });
}

function moveToCoordinates() {
    if (marker) map.removeLayer(marker);
    map.off('click');

    latitude.disabled = '';
    longitude.disabled = '';
}

function checkSelect(select) {
    select.className = '';

    if (select.value == '') {
        select.className = 'error-input';
        return false;
    }

    return true;
}
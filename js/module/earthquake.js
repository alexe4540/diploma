const inputType = document.querySelector("#inputType"),
    event = new Event('change');

let marker,
    msg = document.querySelector('#msg'),
    latitude = document.querySelector("input[name = latitude]"),
    longitude = document.querySelector("input[name = longitude]"),
    magnitude = document.querySelector("input[name = magnitude]"),
    depth = document.querySelector("input[name = depth]"),
    calc = document.querySelector('#calculateButton');

let magnitudeCheck, depthCheck;

calc.addEventListener('click', () => {
    let resultSection = document.querySelector('#resultSection');

    magnitudeCheck = true, depthCheck = true;

    msg.textContent = '';
    msg.className = '';
    magnitude.dispatchEvent(event);
    depth.dispatchEvent(event);

    if (!latitude.value || !longitude.value || !magnitudeCheck || !depthCheck){
        msg.textContent = 'Усі поля повинні бути заповнені!';
        msg.className = 'error-msg';

        return false;
    }

    resultSection.style.display = 'block';

    window.scrollTo(0, -200);
    if (marker) map.removeLayer(marker);

    calculate(latitude.value, longitude.value, magnitude.value, depth.value);
});

magnitude.addEventListener('change', () => {
    msg.textContent = '';
    msg.className = '';
    magnitude.className = '';

    if (!magnitude.value || magnitude.value < 1 || magnitude.value > 9) {
        msg.textContent = 'Магнітуда визначается значеннями від 1 до 9!';
        msg.className = 'error-msg';
        magnitude.className = 'error-input';
        magnitudeCheck = false;
        return ;
    }

    return true;
});

depth.addEventListener('change', () => {
    msg.textContent = '';
    msg.className = '';
    depth.className = '';

    if (depth.value < 1 || depth.value > 6371) {
        msg.textContent = 'Глибина гіпоцентру не може бути меньша 1 та більша радіуса Землі(6371км)!';
        msg.className = 'error-msg';
        depth.className = 'error-input';
        depthCheck = false;
        return ;
    }

    return true;
});

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
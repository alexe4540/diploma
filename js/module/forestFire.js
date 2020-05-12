const inputType = document.querySelector("#inputType"),
    event = new Event('change');

let marker,
    msg = document.querySelector('#msg'),
    latitude = document.querySelector("input[name = latitude]"),
    longitude = document.querySelector("input[name = longitude]"),
    fireType = document.querySelector("#fireType"),
    burnabilityClass = document.querySelector("#burnabilityClass"),
    avgHeghtCarbon = document.querySelector("#avgHeghtCarbon"),
    avgTreeDiameter = document.querySelector("#avgTreeDiameter"),
    startPerimeter = document.querySelector("input[name = startPerimeter]"),
    calc = document.querySelector('#calculateButton');

calc.addEventListener('click', () => {
    let resultSection = document.querySelector('#resultSection');

    msg.textContent = '';
    msg.className = '';
   
   let latitudeCheck = checkSelect(latitude);
   let longitudeCheck = checkSelect(longitude);
   let fireCheck = checkSelect(fireType);
   let burnabilityClassCheck = checkSelect(burnabilityClass);
   let avgHeghtCarbonCheck = checkSelect(avgHeghtCarbon);
   let avgTreeDiameterCheck = checkSelect(avgTreeDiameter);
   let startPerimeterCheck = checkSelect(startPerimeter);

    if (!latitudeCheck || !longitudeCheck || !fireCheck || !burnabilityClassCheck || !avgHeghtCarbonCheck || !avgTreeDiameterCheck || !startPerimeterCheck) {
        msg.textContent = 'Усі поля повинні бути заповнені!';
        msg.className = 'error-msg';

        return false;
    }

    resultSection.style.display = 'block';

    window.scrollTo(0, -200);
    if (marker) map.removeLayer(marker);

    calculate(latitude.value, longitude.value, fireType.value, burnabilityClass.value, avgHeghtCarbon.value, avgTreeDiameter.value, startPerimeter.value);
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
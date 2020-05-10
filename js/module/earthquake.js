const inputType = document.querySelector("#inputType");
let marker,
    latitude = document.querySelector("input[name = latitude]"),
    longitude = document.querySelector("input[name = longitude]"),
    magnitude = document.querySelector("input[name = magnitude]"),
    depth = document.querySelector("input[name = depth]"),
    calc = document.querySelector('#calculateButton');

calc.addEventListener('click', () => {
    let resultSection = document.querySelector('#resultSection');
    resultSection.style.display = 'block';

    window.scrollTo(0, -200);
    if (marker) map.removeLayer(marker);

    calculate(latitude.value, longitude.value, magnitude.value, depth.value);
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
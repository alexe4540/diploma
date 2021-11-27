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
    calc = document.querySelector('#calculateButton'),
    saveButton = document.querySelector('#saveButton');

let latitudeIsValide = false,
    longitudeIsValide = false,
    dateIsValide = false;

(async () => {
    const params = new URLSearchParams(document.location.search.substring(1));
    const id_cat = params.get("id_cat");

    if (id_cat) {
        const catResponce = await apiRequest('getFireData', 'dbrouter', {
            id_cat
        });
        const cat = JSON.parse(catResponce);

        const resultSection = document.querySelector('#resultSection');
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 564;

        let mapImg = document.querySelector('#mapImg');
        let cnvs = document.querySelector("canvas");
        if (cnvs) cnvs.remove();
        canvas.id = 'canvas';
        mapImg.appendChild(canvas);

        calculate(
            cat.latitude,
            cat.longitude,
            cat.fire_type,
            cat.burnability_class,
            cat.avg_heght_carbon,
            cat.avg_tree_diameter,
            cat.start_perimeter,
            cat.cat_date,
            cat.zone_pic
        );

        setTimeout(() => {
            resultSection.style.display = 'block';
        }, 2000);
    } else {
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

            window.scrollTo(0, -200);
            if (marker) map.removeLayer(marker);

            calculate(latitude.value, longitude.value, fireType.value, burnabilityClass.value, avgHeghtCarbon.value, avgTreeDiameter.value, startPerimeter.value, fdate.value);

            setTimeout(() => {
                resultSection.style.display = 'block';
            }, 2000);
        });

        if (saveButton.display !== 'none') {
            saveButton.addEventListener('click', async function () {
                const cnvs = document.querySelector("canvas")

                let imageName = getRandomString() + '.png';
                let imageDataURL = cnvs.toDataURL('image/png');

                let resultImgSave = await apiRequest('saveImg', 'imgRouter', { img_name: imageName, img_data_url: imageDataURL });
                let resultDBSave = await apiRequest('saveFireInitData', 'initDataRouter', {
                    id_cat_type: 3,
                    cat_date: fdate.value,
                    zone_pic: imageName,
                    longitude: longitude.value,
                    latitude: latitude.value,
                    fire_type: fireType.value,
                    burnability_class: burnabilityClass.value,
                    avg_heght_carbon: avgHeghtCarbon.value,
                    avg_tree_diameter: avgTreeDiameter.value,
                    start_perimeter: startPerimeter.value,
                });

                if (resultImgSave && resultDBSave) {
                    alert("Дані успішно збережені");
                } else {
                    alert("Помилка збереження даних");
                }
            });
        }

        startPerimeter.addEventListener('change', () => {
            msg.textContent = '';
            msg.className = '';

            if (startPerimeter.value < 0) {
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

            if (new Date(fdate.value).getTime() / 1000 > new Date().getTime() / 1000) {
                saveButton.style.display = 'none';
            }

            return true;
        });
    }
})()

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
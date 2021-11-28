const map = L.map('map').setView([49.0384, 31.4513], 6);
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.control.scale().addTo(map);

const markersLayer = L.layerGroup().addTo(map);

const allTimeCheckbox = document.querySelector('#allTime'),
    dateNow = document.querySelector('#dateNow'), 
    fromDate = document.querySelector('#fromDate'),
    toDate = document.querySelector('#toDate'),
    catType = document.querySelector('#catType'),
    applyFilterButton = document.querySelector("#applyFilterButton");

(async () => {
	const catListJSON = await apiRequest('cat_list', 'dbrouter', {
        id_cat_type: 0,
        from_date: undefined,
        to_date: undefined,
    });

    const catList = JSON.parse(catListJSON);

    fillMap(catList);
})();

applyFilterButton.addEventListener('click', async () => {
	const catListJSON = await apiRequest('cat_list', 'dbrouter', {
        id_cat_type: catType.value,
        from_date: fromDate.value !== "" ? fromDate.value : null,
        to_date: toDate.value !== "" ? toDate.value : null,
    });

    const catList = JSON.parse(catListJSON);

    fillMap(catList);
})

allTimeCheckbox.addEventListener('change', () => {
    fromDate.value = null;
    toDate.value = null;
    dateNow.checked = false;
    fromDate.disabled = allTimeCheckbox.checked;
    toDate.disabled = allTimeCheckbox.checked;
    dateNow.disabled = allTimeCheckbox.checked;
})

dateNow.addEventListener('change', () => {
    if (dateNow.checked) {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        toDate.value = now.toISOString().slice(0, 16);
        toDate.disabled = true;
    } else {
        toDate.value = null;
        toDate.disabled = false;
    }
});

function fillMap(catList) {
    markersLayer.clearLayers();

    catList.forEach(cat => {
        let markerColor, icon;

        switch(Number(cat.id_cat_type)) {
            case 1: 
                icon = 'flask';
                markerColor = 'blue';
                break;
            case 2:
                icon = 'mountain';
                markerColor = 'green';
                break;
            case 3:
                icon = 'fire-alt';
                markerColor = 'red';
                break;
            default:
                break;
        }

        const marker = L.marker([cat.latitude, cat.longitude], {icon: L.AwesomeMarkers.icon({icon, markerColor, prefix: 'fa'}) }).addTo(markersLayer);

        const link = createLink(cat.id_cat_type, cat.id_cat);

        marker.bindPopup(
            `<b>Вид катастрофи:</b> ${cat.name}<br/>
            <b>Дата:</b> ${cat.cat_date}<br/>
            <b>Користувач:</b> ${cat.uname ?? 'Гість'}<br/>
            <a href="${link}">Переглянути деталі</a>
            
            `
        )
    })
}

function createLink(id_cat_type, id_cat) {
    let page = '';

    switch(Number(id_cat_type)) {
        case 1: 
            page = "nhrCalculator.php";
            break;
        case 2:
            page = "earthquakeCalculator.php";
            break;
        case 3:
            page = "fireCalculator.php";
            break;
        default:
            break;
    }

    return `/pages/${page}?id_cat=${id_cat}`;
}
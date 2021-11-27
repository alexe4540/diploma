const map = L.map('map').setView([49.0384, 31.4513], 6);
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.control.scale().addTo(map);


(async () => {
	const catListJSON = await apiRequest('cat_list', 'dbrouter');
    const catList = JSON.parse(catListJSON);

    catList.forEach(cat => {
        const marker = L.marker([cat.latitude, cat.longitude]).addTo(map);

        const link = createLink(cat.id_cat_type, cat.id_cat);

        marker.bindPopup(
            `<b>Вид катастрофи:</b> ${cat.name}<br/>
            <b>Дата:</b> ${cat.cat_date}<br/>
            <b>Користувач:</b> ${cat.uname ?? 'Гість'}<br/>
            <a href="${link}">Переглянути деталі</a>
            
            `
        )
    })
})();

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
async function workWIthMap(coordinates, scale) {
    let latitude = coordinates.latitude;
    let longitude = coordinates.longitude;

    map.setView([latitude, longitude], scale);

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("готово!"), 1000)
    });
    let result = await promise;

    goFunc();
    
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("готово!"), 1000)
    });
}

let map;

(() => {
    const params = new URLSearchParams(document.location.search.substring(1));
    const id_cat = params.get("id_cat");

    if (!id_cat) {
        map = L.map('map').setView([50.452554, 30.561522], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.control.scale().addTo(map);
    }
})();

function goFunc() {
    html2canvas(document.querySelector("#map"), {
        allowTaint: true,
        useCORS: true,
    }).then(function (canvas) {
        let mapImg = document.querySelector('#mapImg');
        let cnvs = document.querySelector("canvas");
        if (cnvs) cnvs.remove();
        canvas.id = 'canvas';
        mapImg.appendChild(canvas);
    })
};

function drawOnMap(drawFuncName, color, canvas, latitude, longitude, scale, radius, angle) {
    let ctx = canvas.getContext('2d');

    if( drawFuncName == 'drawArc'){
        let rad = pixelValue(latitude, radius * 1000, scale)

        drawArc(color, ctx, [canvas.width / 2, canvas.height / 2], rad);
    } else if (drawFuncName == 'drawEllipse') {
        let sPixelA = pixelValue(latitude, radius[0], scale);
        let sPixelB = pixelValue(latitude, radius[1], scale);
    
        drawEllipse(color, ctx, [canvas.width / 2, canvas.height / 2], [sPixelA, sPixelB], angle);
    
        return;
    } else if (drawFuncName == 'drawFireZone'){
        let sPixelA = pixelValue(latitude, radius[0], scale);
        let sPixelB = pixelValue(latitude, radius[1], scale);
    
        drawFireZone(color, ctx, [canvas.width / 2, canvas.height / 2], [sPixelA, sPixelB], angle);
    
        return;
    }
}

function metersPerPixel(latitude, zoomLevel) {
    let earthCircumference = 40075016.6;
    let latitudeRadians = latitude * (Math.PI / 180);
    return earthCircumference * Math.cos(latitudeRadians) / Math.pow(2, zoomLevel + 8);
};

function pixelValue(latitude, meters, zoomLevel) {
    return meters / metersPerPixel(latitude, zoomLevel);
};
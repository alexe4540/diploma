async function workWIthMap(coordinates, scale, sizes, angle) {
    let latitude = coordinates.latitude;
    let longitude = coordinates.longitude;
    let semiaxisA = (sizes[0] * 1000) / 2;
    let semiaxisB = (sizes[1] * 1000) / 2;

    map.setView([latitude, longitude], scale);

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("готово!"), 1000)
    });
    let result = await promise;

    goFunc(latitude, longitude, scale, semiaxisA, semiaxisB, angle);

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("готово!"), 1000)
    });
}



const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.control.scale().addTo(map);

function goFunc(latitude, longitude, scale, semiaxisA, semiaxisB, angle) {
    html2canvas(document.querySelector("#map"), {
        allowTaint: true,
        useCORS: true,
    }).then(function (canvas) {
        let mapImg = document.querySelector('#mapImg');
        let cnvs = document.querySelector("canvas");
        if (cnvs) cnvs.remove();
        canvas.id = 'canvas';
        drawOnMap(canvas, latitude, longitude, scale, semiaxisA, semiaxisB, angle);
        mapImg.appendChild(canvas);
    })
};

//TODO придумать как посчитать пиксели внетри круга

function drawOnMap(canvas, latitude, longitude, scale, semiaxisA, semiaxisB, angle) {
    let ctx = canvas.getContext('2d');

    let sPixelA = pixelValue(latitude, semiaxisA, scale);
    let sPixelB = pixelValue(latitude, semiaxisB, scale);

    ctx.lineWidth = 2;
    drawEllipse(ctx, [canvas.width / 2, canvas.height / 2], [sPixelA, sPixelB], angle);

    return;
}

function metersPerPixel(latitude, zoomLevel) {
    let earthCircumference = 40075016.6;
    let latitudeRadians = latitude * (Math.PI / 180);
    return earthCircumference * Math.cos(latitudeRadians) / Math.pow(2, zoomLevel + 8);
};

function pixelValue(latitude, meters, zoomLevel) {
    return meters / metersPerPixel(latitude, zoomLevel);
};
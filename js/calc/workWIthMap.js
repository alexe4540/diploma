async function workWIthMap(coordinates, scale, sizes, angle) {
    let latitude = coordinates.latitude;
    let longitude = coordinates.longitude;
    let semiaxisA = (sizes[0] / 2) * 1000;
    let semiaxisB = (sizes[1] / 2) * 1000;
    
    map.setView([latitude, longitude], scale);

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("готово!"), 100)
    });    
    let result = await promise;

    goFunc(latitude, longitude, scale, semiaxisA, semiaxisB, angle);
}

const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.control.scale().addTo(map);

function goFunc(latitude, longitude, scale, semiaxisA, semiaxisB, angle) {
    html2canvas(document.querySelector("#map"), {
        allowTaint: true,
    }).then(function (canvas) {
        let cnvs = document.querySelector("canvas");
        if (cnvs) cnvs.remove();
        document.body.appendChild(canvas);
        drawOnMap(latitude, longitude, scale, semiaxisA, semiaxisB, angle);
    });
};

function drawOnMap(latitude, longitude, scale, semiaxisA, semiaxisB, angle) {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');

    let sPixelA = pixelValue(latitude, semiaxisA, scale);
    let sPixelB = pixelValue(longitude, semiaxisB, scale);

    ctx.lineWidth = 5;
    drawEllipse(ctx, [canvas.width / 2, canvas.height / 2], [sPixelA, sPixelB], angle);
}

function metersPerPixel(latitude, zoomLevel) {
    let earthCircumference = 40075016.6;
    let latitudeRadians = latitude * (Math.PI / 180);
    return earthCircumference * Math.cos(latitudeRadians) / Math.pow(2, zoomLevel + 8);
};

function pixelValue(latitude, meters, zoomLevel) {
    return meters / metersPerPixel(latitude, zoomLevel);
};
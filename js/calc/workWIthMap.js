async function workWIthMap(coordinates, scale) {
    let latitude = coordinates.latitude;
    let longitude = coordinates.longitude;

    map.setView([latitude, longitude], scale);

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("готово!"), 1000)
    });
    let result = await promise;

    goFunc(latitude, longitude, scale);
    
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("готово!"), 1000)
    });
}

const map = L.map('map').setView([50.452554, 30.561522], 5);
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.control.scale().addTo(map);

function goFunc(latitude, longitude, scale) {
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

//TODO придумать как посчитать пиксели внетри круга

function drawOnMap(color, canvas, latitude, longitude, scale, radius, angle) {
    let ctx = canvas.getContext('2d');

    if(typeof radius == 'number'){
        let rad = pixelValue(latitude, radius * 1000, scale)

        drawArc(color, ctx, [canvas.width / 2, canvas.height / 2], rad);
    } else {
        let sPixelA = pixelValue(latitude, radius[0], scale);
        let sPixelB = pixelValue(latitude, radius[1], scale);
    
        ctx.lineWidth = 2;
        drawEllipse(color, ctx, [canvas.width / 2, canvas.height / 2], [sPixelA, sPixelB], angle);
    
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
async function workWIthMap(coordinates, scale, sizes, angle) {
    let latitude = coordinates.latitude;
    let longitude = coordinates.longitude;
    let semiaxisA = (sizes[0] / 2) * 1000;
    let semiaxisB = (sizes[1] / 2) * 1000;

    map.setView([latitude, longitude], scale);

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("готово!"), 1000)
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
        useCORS: true,
    }).then(function (canvas) {
        let cnvs = document.querySelector("canvas");
        if (cnvs) cnvs.remove();
        canvas.id = 'canvas';
        drawOnMap(canvas, latitude, longitude, scale, semiaxisA, semiaxisB, angle);
        document.body.appendChild(canvas);
        let data = getData();
        let rgba = unitArrayToREguralArray(data);

        let ctx = canvas.getContext('2d');
        ctx.putImageData(data, 0, 0);
        console.log('length: ', rgba, 'data: ', data)
    })
};

//TODO придумать как посчитать пиксели внетри круга


function unitArrayToREguralArray(unitArray){
    let regularArray = [];
    let rgbaArray = [];

    for(let i = 0; i < unitArray.data.length; i+=4){
        regularArray.push([unitArray.data[i],unitArray.data[i+1], unitArray.data[i+2], unitArray.data[i+3]]);
    }

    let counter = 0;

    for (let i = 0; i < unitArray.height; i++){
        let tmpArray = [];
        for (let j = 0; j < unitArray.width; j++){
            tmpArray.push(regularArray[j+counter]);
        }
        rgbaArray.push(tmpArray);
        counter += unitArray.width;
    }

    return rgbaArray;
}

function getData() {
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");

    return ctx.getImageData(0, 0, c.width, c.height);
}

function drawOnMap(canvas, latitude, longitude, scale, semiaxisA, semiaxisB, angle) {
    let ctx = canvas.getContext('2d');

    let sPixelA = pixelValue(latitude, semiaxisA, scale);
    let sPixelB = pixelValue(latitude, semiaxisB, scale);

    ctx.lineWidth = 5;
    drawEllipse(ctx, [canvas.width / 2, canvas.height / 2], [sPixelA, sPixelB], angle);

    return ;
}

function metersPerPixel(latitude, zoomLevel) {
    let earthCircumference = 40075016.6;
    let latitudeRadians = latitude * (Math.PI / 180);
    return earthCircumference * Math.cos(latitudeRadians) / Math.pow(2, zoomLevel + 8);
};

function pixelValue(latitude, meters, zoomLevel) {
    return meters / metersPerPixel(latitude, zoomLevel);
};
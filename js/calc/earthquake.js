const latitude = 50.452554,
    longitude = 30.561522,
    zoom = 12,
    dangerZoneBorderColorRGB = {
        r: 255,
        g: 0,
        b: 0,
    },
    midleDangerZoneBorderColorRGB = {
        r: 255,
        g: 111,
        b: 0,
    };


    (async function () {
        await workWIthMap({
                latitude,
                longitude,
            },
            zoom
        );

        let canvas = document.querySelector('#canvas');

        drawOnMap(dangerZoneBorderColorRGB, canvas, latitude, longitude, zoom, 2.5);
        drawOnMap(midleDangerZoneBorderColorRGB, canvas, latitude, longitude, zoom, 3.5);


    })();
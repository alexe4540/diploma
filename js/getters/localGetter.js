function getValueFromForm(idElment){
    return document.querySelector(`#${idElment}`).value;
};

function getTimeOfDay(time){
    let accidentTime = time.slice(0, 2);

    return  accidentTime < 7 || accidentTime > 23 ? "Ніч" : "День";
};

function getDeptDecr(placeLeng, kzm){
    return +(placeLeng * (1 - 1 / kzm)).toFixed(2);
}

function getDeptCalculatedZone(tablDeptZone, ksx, deptDecr){
    return +(tablDeptZone/ksx - deptDecr).toFixed(2);
}

function getDeptTransfer(transferSpeed){
    return 4 * transferSpeed; 
}

function getForecastDeptZone(deptCalculatedZone, deptTramsfer){
    return +deptCalculatedZone < deptTramsfer ? +deptCalculatedZone : deptTramsfer;
}

function getWidthForecastZone(degreeOfVerticalStability, forecastDeptZone){
    switch (degreeOfVerticalStability){
        case 'інверсія':
            return +(0.3 * Math.pow(forecastDeptZone, 0.6)).toFixed(2);
        case 'ізотермія':
            return +(0.3 * Math.pow(forecastDeptZone, 0.75)).toFixed(2);
        case 'конвекція':
            return +(0.3 * Math.pow(forecastDeptZone, 0.95)).toFixed(2);
        default:
            break;
    }
}

function getF(windSpeed){
    if(windSpeed <= 0.5)
        return 360;
    else if (windSpeed > 0.5 && windSpeed <= 1)
        return 180;
    else if (windSpeed > 1 && windSpeed <= 2)
        return 90;
    else 
        return 45;
}

function getSquarePossibleZone(forecastDeptZone, F){
    return +(8.72 * Math.pow(10, -3) * Math.pow(forecastDeptZone, 2) * F).toFixed(2);
}

function getK(degreeOfVerticalStability){
    switch (degreeOfVerticalStability){
        case 'інверсія':
            return 0.081;
        case 'ізотермія':
            return 0.133;
        case 'конвекція':
            return 0.235;
        default:
            break;
    }
}

function getSquarePredictedZone(K, forecastDeptZone, N){
    return +(K * Math.pow(forecastDeptZone, 2) * Math.pow(N, 0.2)).toFixed(2); 
}
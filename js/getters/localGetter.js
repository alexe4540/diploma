function getValueFromForm(idElment){
    return document.querySelector(`#${idElment}`).value;
};

function getTimeOfDay(time){
    let accidentTime = time.slice(0, 2);

    return  accidentTime < 7 || accidentTime > 21 ? "Ніч" : "День";
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

function getPeopleLoss(countOfPeople, percent){
    const totalLoss = ((countOfPeople * percent) / 100).toFixed(0);
    const lightSeverity = ((totalLoss * 25) / 100).toFixed(0);
    const moderateSeverity = ((totalLoss * 40) / 100).toFixed(0);
    const death = ((totalLoss * 35) / 100).toFixed(0);
    
    return {totalLoss, lightSeverity, moderateSeverity, death}
 }

 function getSqrt(meterperPixel, countOfPixelInZone, zoneLength){
    return Math.pow((zoneLength * meterperPixel) / 1000, 2) * (countOfPixelInZone/Math.pow(zoneLength, 2));
 }

 function getPeopleLossDamage(lossObj){
     let svtpp = 0.28 * lossObj.lightSeverity + 6.5 * lossObj.moderateSeverity + 47 * lossObj.death;
     let svdp  = 4.1 * lossObj.death;

     return svtpp + svdp;
 }

function getAgricultureDamage(fieldSqrt, productivity, avg_cost){
    return (fieldSqrt) * 0.5 * productivity * (avg_cost / 1000);
}

function getForestDamage(forestSqrt, forestNormDamage){
    return 0.5 *  1.53 * forestSqrt * forestNormDamage;
}

function getRandomString() {
    const length = 20;
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for ( let i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}
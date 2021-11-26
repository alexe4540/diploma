//const for calc
const V0 = 0.4, //  V0 – скорость распространения пожара на равнине в безветренную погоду, м/мин
    k = 0.16, //  k – коэффициент, учитывающий раздувающее влияние пламени
    C = 3,
    routerName = "dbrouter"; // С – коэффициент, учитывающий удельную теплоемкость горючих материалов

const zoom = 11,
    zoneBorderColorRGB = {
        r: 255,
        g: 0,
        b: 0,
    },
    zoneBorderColorRGB2 = {
        r: 0,
        g: 0,
        b: 255,
    },
    zoneBorderColorRGB3 = {
        r: 255,
        g: 255,
        b: 0,
    };

//variable
const hourOne = 24,
    hourTwo = 48;

async function calculate(latitude, longitude, fireType, burnabilityClass, avgHeghtCarbon, avgTreeDiameter, startPerimeter, date) {
    const accidentDate = new Date(date);
    const unixAcidentDate = accidentDate.getTime() / 1000;
    const wetherObjJSON = await getWetherData(latitude, longitude, unixAcidentDate);
    const wetherObj = JSON.parse(wetherObjJSON);

    const temperature = wetherObj.currently.temperature, //            температура воздуха
        windSpeed = wetherObj.currently.windSpeed, //            скорость ветра
        windAzimut = wetherObj.currently.windBearing, //            угол/азимут ветра
        humidity = wetherObj.currently.humidity; //     влажность

    let dewPoint = getDewPoint(temperature, humidity),
        indicator = getIndicator(temperature, dewPoint),
        wetherClass = getWetherClass(indicator),
        linearFireFrontSpeed = getLinearFireFrontSpeed(fireType, windSpeed),
        linearFireWingSpeed = getLinearFireWingSpeed(windSpeed),
        linearFireRearSpeed = getLinearFireRearSpeed(windSpeed),
        perimeterGainOne = getPerimeterGain(linearFireFrontSpeed, hourOne),
        newPerimeterOne = getPerimeterInHours(startPerimeter, perimeterGainOne),
        newSquareOne = getSquareInHours(newPerimeterOne),
        perimeterGainTwo = getPerimeterGain(linearFireFrontSpeed, hourTwo),
        newPerimeterTwo = getPerimeterInHours(startPerimeter, perimeterGainTwo),
        newSquareTwo = getSquareInHours(newPerimeterTwo),
        unusableWood = getUnusableWood(fireType, burnabilityClass);

    let woodDamage = await apiRequest("wood_damage", routerName, {
        avgTreeDiameter,
        avgHeghtCarbon,
        burnabilityClass
    });
    let woodDamageCharJSON = await apiRequest("wood_damage_char", routerName, {
        woodDamage,
    });

    let woodDamageChar = JSON.parse(woodDamageCharJSON);

    await workWIthMap({
            latitude,
            longitude,
        },
        zoom
    );

    const canvas = document.querySelector('#canvas');

    let radiusCircle = getRadius(startPerimeter);
    let sCircle = Math.ceil((Math.PI * Math.pow(radiusCircle, 2)) / 10000);
    drawOnMap('drawArc', zoneBorderColorRGB, canvas, latitude, longitude, zoom, radiusCircle / 1000);

    let radiusNewCircleOne = getRadius(newPerimeterOne);
    let axisOne = getAxis(radiusNewCircleOne, linearFireFrontSpeed, linearFireRearSpeed, hourOne)
    let semiaxisOne = getSemiaxis(axisOne);
    let semiordinatOne = radiusNewCircleOne;
    drawOnMap('drawFireZone', zoneBorderColorRGB2, canvas, latitude, longitude, zoom, [semiaxisOne, semiordinatOne], windAzimut);

    let radiusNewCircleTwo = getRadius(newPerimeterTwo);
    let axisTwo = getAxis(radiusNewCircleTwo, linearFireFrontSpeed, linearFireRearSpeed, hourTwo)
    let semiaxisTwo = getSemiaxis(axisTwo);
    let semiordinatTwo = radiusNewCircleTwo;
    drawOnMap('drawFireZone', zoneBorderColorRGB3, canvas, latitude, longitude, zoom, [semiaxisTwo, semiordinatTwo], windAzimut);


    createTable('resultTable', [
        ['Час',
            'Площа лісової пожежі, Га ',
            'Периметр лісової пожежі, км',
        ],
        [
            'На момент виявлення(червоний)',
            sCircle,
            startPerimeter,
        ],
        [
            'Через добу після виявлення(синій)',
            newSquareOne / 1000,
            newPerimeterOne,
        ],
        [
            'Через дві доби після виявлення(жовтий)',
            newSquareTwo / 1000,
            newPerimeterTwo,
        ],
    ], 'Таблиця 1 - Розповсюдження пожежі в часових проміжках');


    let res;
    if (fireType = 3) {
        res = woodDamageChar[0][0] + ' Відсоток непригодної деревини = ' + woodDamageChar[0][1];
    } else {
        res = unusableWood;
    }

    createTable('damageTable', [
        ['Класс пожежної небезпеки',
            'Швидкість фронту пожежі, м/с',
            'Швидкість флангу пожежі, м/с',
            'Швидкість тилу пожежі, м/с',
            'Відсоток деревини непригодної для реалізації'
        ],
        [
            wetherClass,
            linearFireFrontSpeed,
            linearFireWingSpeed,
            linearFireRearSpeed,
            res
        ]
    ], 'Таблиця 2 - Загальні відомостіпро пожежу');
};

function getS(square) {
    return square * 10000;
}

function getSemiaxis(axis) {
    return axis / 2;
}

function getAxis(radiusCircle, linearFireFrontSpeed, linearFireRearSpeed, hours) {
    return radiusCircle * 2 + linearFireFrontSpeed * hours + linearFireRearSpeed * hours;
}

function getRadius(perimeter) {
    return perimeter / (2 * Math.PI);
}

function getDewPoint(temperature, humidity) {
    const F = getF(temperature, humidity);
    return (237.7 * F) / (17.27 - F);
}

function getF(temperature, humidity) {
    return (17.23 * temperature) / (237.7 + temperature) + Math.log(humidity / 100);
}

function getIndicator(noonTemperature, dewPoint) {
    return ((noonTemperature - dewPoint) * noonTemperature) * 14;
}

function getWetherClass(indicator) {
    if (indicator <= 300)
        return 1; //отсутствие опасности
    else if (indicator > 300 && indicator <= 1000)
        return 2; //малая пожарная опасность
    else if (indicator > 1000 && indicator <= 4000)
        return 3; //средняя пожарная опасность
    else if (indicator > 4000 && indicator <= 12000)
        return 4; //высокая пожарная опасность
    else if (indicator >= 12000)
        return 5; //чрезвычайная опасность
}

function getLinearFireFrontSpeed(fireType, windSpeed) {
    switch (+fireType) {
        case 1:
            return 120;
        case 2:
            return 250;
        case 3:
            return Math.ceil(((V0 + k * windSpeed) * Math.pow(1 + (windSpeed / Math.sqrt(Math.pow(windSpeed, 2) + Math.pow(C, 2))), 2)) * 30);
        default:
            return;
    }
}

function getLinearFireWingSpeed(windSpeed) {
    return Math.ceil((V0 + k * windSpeed) * 30);
}

function getLinearFireRearSpeed(windSpeed) {
    return Math.ceil(((V0 + k * windSpeed) * Math.pow(1 - (windSpeed / Math.sqrt(Math.pow(windSpeed, 2) + Math.pow(C, 2))), 2)) * 30);
}

function getPerimeterGain(linearFireFrontSpeed, hours) {
    return 3.3 * linearFireFrontSpeed * hours;
}

function getPerimeterInHours(startPerimeter, perimeterGain) {
    return Math.ceil(+startPerimeter + perimeterGain);
}

function getSquareInHours(newPerimeter) {
    return Math.ceil(4 * Math.pow(10, -6) * Math.pow(newPerimeter, 2));
}

function getUnusableWood(fireType, burnabilityClass) {
    if (+fireType == 2 && +burnabilityClass == 1) {
        return 50;
    } else if (+fireType == 2 && +burnabilityClass == 2) {
        return 70;
    } else if (+fireType == 3 && +burnabilityClass == 1) {
        return 30;
    } else if (+fireType == 3 && +burnabilityClass == 2) {
        return 60;
    } else {
        return;
    }
}
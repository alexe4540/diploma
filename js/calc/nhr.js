let zoom = 12;
const routerName = "dbrouter",
        height = 1, //                  высота обвалования              с формы
        today = new Date(),
        accidentTime = today.getHours() + ":" + today.getMinutes(), //    время аварии автоматом
        place = {
                //                    инфа о местности                с формы
                type: "відкрита",
                place: "Ліс",
                leng: 1,
        },
        zoneBorderColorRGB = {
                r: 255,
                g: 0,
                b: 0,
        },
        forestColorRGB = {
                r: 178,
                g: 194,
                b: 157,
        },
        waterColorRGB = {
                r: 144,
                g: 204,
                b: 203,
        },
        fieldColorRGB = {
                r: 222,
                g: 221,
                b: 190,
        };

async function calculate(id, nhrType, nhrQuantity, provGasMasl) {
        const factoryStr = await workWithBD("factory", routerName, {
                id,
        });
        const factoryArr = factoryStr.split("|");

        const latitude = +factoryArr[0], //    широта
                longitude = +factoryArr[1], //    долгота
                peopleNum = +factoryArr[2], //    количество людей на обьекте
                city = factoryArr[3]; //    город в котором находится обьект

        const wetherObjJSON = await getWetherData(latitude, longitude);
        const wetherObj = JSON.parse(wetherObjJSON);

        const temperature = wetherObj.currently.temperature, //            температура воздуха
                windSpeed = wetherObj.currently.windSpeed, //            скорость ветра
                windAzimut = wetherObj.currently.windBearing; //            угол/азимут ветра

        let cloudiness = wetherObj.currently.summary; //            облачность

        cloudiness =
                cloudiness == "Ясно" ?
                cloudiness :
                cloudiness == "Хмарно" ?
                cloudiness :
                "Напівясно";

        const timeOfDay = getTimeOfDay(accidentTime); //Время суток

        const degreeOfVerticalStability = await workWithBD("vertical", routerName, {
                timeOfDay,
                cloudiness,
                windSpeed,
        }); //ступінь вертикальної стійкості

        const tablDeptZone = await workWithBD("tabledeptvalue", routerName, {
                nhrQuantity,
                nhrType,
                degreeOfVerticalStability,
                temperature,
                windSpeed,
        }); //Гт - табличне значення глибини зони

        const ksx = await workWithBD("nhr_cloud", routerName, {
                nhrType,
                height,
        }); //Ксх - коефіцієнт, що враховує тип сховища і характеризує зменшення глибини розповсюдження хмари НХР при виливі "у піддон"

        const kzm = await workWithBD("koef_kzm", routerName, {
                degreeOfVerticalStability,
                palce: place["place"],
        }); //Кзм - коефіцієнт зменшення глибини розповсюдження хмари НХР для кожного 1 км довжини закритої місцевост

        const deptDecr = getDeptDecr(place.leng, kzm); //Гзм - величина, на яку зменшується глибина розповсюдження хмари НХР

        const deptCalculatedZone = getDeptCalculatedZone(tablDeptZone, ksx, deptDecr); //розрахункової глибини отримане значення Гр

        const transferSpeed = await workWithBD("v_transfer", routerName, {
                windSpeed,
                degreeOfVerticalStability,
        }); //W - швидкість переносу повітряних мас

        const deptTramsfer = getDeptTransfer(transferSpeed); //глибини переносу повітряних мас Гп

        const forecastDeptZone = getForecastDeptZone(
                deptCalculatedZone,
                deptTramsfer
        ); //за фактичну прогнозовану глибину зони забруднення, тобто Гпзхз

        zoom = forecastDeptZone > 10 ? 11 : forecastDeptZone < 2 ? 13 : zoom;

        if (forecastDeptZone > 2)
                zoom = 11;
        else if (forecastDeptZone < 2)
                zoom = 13;

        const widthForecastZone = getWidthForecastZone(
                degreeOfVerticalStability,
                forecastDeptZone
        ); //Ширина прогнозованої зони хімічного забруднення (Шпзхз)

        const F = getF(windSpeed); //Коефіцієнт Ф, який залежить від швидкості вітру

        const squarePossibleZone = getSquarePossibleZone(forecastDeptZone, F); //Площа зони можливого хімічного забруднення (ЗМХЗ).const

        const K = getK(degreeOfVerticalStability); //де К – коефіціент

        const N = 4; //N – час, на який розраховується глибина ПЗХЗ
        const squarePredictedZone = getSquarePredictedZone(K, forecastDeptZone, N); //Площа прогнозованої зони хімічного забруднення (ПЗХЗ)

        const pollutionDuration = await workWithBD("pollution_duration", routerName, {
                nhrType,
                height,
                temperature,
                windSpeed,
        });

        const percentOfLoss = await workWithBD("population_loss", routerName, {
                place: place.type,
                provGasMasl,
        });
        const peopleLoss = getPeopleLoss(peopleNum, percentOfLoss);

        const meterperPixel = metersPerPixel(latitude, zoom);

        await workWIthMap({
                        latitude,
                        longitude,
                },
                zoom
        );

        const semiaxisA = (forecastDeptZone * 1000) / 2;
        const semiaxisB = (widthForecastZone * 1000) / 2;

        const canvas = document.querySelector('#canvas');
        drawOnMap('drawEllipse', zoneBorderColorRGB, canvas, latitude, longitude, zoom, [semiaxisA, semiaxisB], windAzimut);

        createTable('resultTable', [
                [
                        "Тип НХР, кількість, тон",
                        "Глибина ПЗХЗ, км",
                        "Ширина ПЗХЗ, км",
                        "Площа ПЗХЗ, км.кв.",
                        "Площа МЗХЗ, км.кв.",
                        "Тривалість уражаючої дії, хв",
                        "Втрати людей, чол",
                ],
                [
                        nhrType + ", " + nhrQuantity,
                        forecastDeptZone,
                        widthForecastZone,
                        squarePredictedZone,
                        squarePossibleZone,
                        pollutionDuration,
                        `Всього: ${peopleLoss.totalLoss}, смерт.- ${peopleLoss.death}, серед.- ${peopleLoss.moderateSeverity}, легкі- ${peopleLoss.lightSeverity}`,
                ],
        ], 'Таблиця 1 - Результати оцінки хімічної обстановки');

        const data = getData();

        const fieldInZone = findPixelsInZone(data, zoneBorderColorRGB, fieldColorRGB);
        const forestInZone = findPixelsInZone(data, zoneBorderColorRGB, forestColorRGB);
        const waterInZone = findPixelsInZone(data, zoneBorderColorRGB, waterColorRGB);

        const fieldSqrt = getSqrt(meterperPixel, fieldInZone, data.length);
        const forestSqrt = getSqrt(meterperPixel, forestInZone, data.length);
        const waterSqrt = getSqrt(meterperPixel, waterInZone, data.length);

        const peopleLossDamage = getPeopleLossDamage(peopleLoss);

        const cityInfoStr = await workWithBD("agriculture", routerName, {
                city,
        });
        const cityInfo = cityInfoStr.split("|");

        const agricultureDamage = getAgricultureDamage(
                fieldSqrt,
                cityInfo[0],
                cityInfo[1]
        );

        const foresDamage = getForestDamage(forestSqrt, cityInfo[2]);

        const waterDamage = 900 * waterSqrt;

        createTable('damageTable', [
                [
                        'Витрати на відшкодування життя та здоров’я населення',
                        'Збитки від порушення сільськогосподарських угідь',
                        'Збитки від втрати деревини та інших лісових ресурсів',
                        'Збитки рибного господарства'
                ],
                [
                        peopleLossDamage.toFixed(2),
                        agricultureDamage.toFixed(2),
                        foresDamage.toFixed(2),
                        waterDamage.toFixed(2)
                ]
        ], 'Таблиця 2 - Результати оцінки прогнозованого еколого-економічного збитку')
}


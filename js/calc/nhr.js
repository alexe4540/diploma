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
        let factoryStr = await workWithBD("factory", routerName, {
                id,
        });
        let factoryArr = factoryStr.split("|");

        const latitude = +factoryArr[0], //    широта
                longitude = +factoryArr[1], //    долгота
                peopleNum = +factoryArr[2], //    количество людей на обьекте
                city = factoryArr[3]; //    город в котором находится обьект

        console.log("factoryStr ", factoryStr);

        let wetherObjJSON = await getWetherData(latitude, longitude);
        let wetherObj = JSON.parse(wetherObjJSON);
        console.log(wetherObj);

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

        console.log(
                "nhrType ",
                nhrType,
                "nhrQuantity ",
                nhrQuantity,
                "height ",
                height,
                "temperature ",
                temperature,
                "windSpeed ",
                windSpeed,
                "windAzimut ",
                windAzimut,
                "accidentTime ",
                accidentTime,
                "cloudiness ",
                cloudiness,
                place,
                peopleNum,
                provGasMasl
        );

        const timeOfDay = getTimeOfDay(accidentTime); //Время суток
        console.log("timeOfDay ", timeOfDay);

        const degreeOfVerticalStability = await workWithBD("vertical", routerName, {
                timeOfDay,
                cloudiness,
                windSpeed,
        }); //ступінь вертикальної стійкості
        console.log("ступінь вертикальної стійкості` ", degreeOfVerticalStability);

        const tablDeptZone = await workWithBD("tabledeptvalue", routerName, {
                nhrQuantity,
                nhrType,
                degreeOfVerticalStability,
                temperature,
                windSpeed,
        }); //Гт - табличне значення глибини зони
        console.log("Гт - табличне значення глибини зони` ", tablDeptZone);

        const ksx = await workWithBD("nhr_cloud", routerName, {
                nhrType,
                height,
        }); //Ксх - коефіцієнт, що враховує тип сховища і характеризує зменшення глибини розповсюдження хмари НХР при виливі "у піддон"
        console.log(
                "Ксх - коефіцієнт, що враховує тип сховища і характеризує зменшення глибини` ",
                ksx
        );

        const kzm = await workWithBD("koef_kzm", routerName, {
                degreeOfVerticalStability,
                palce: place["place"],
        }); //Кзм - коефіцієнт зменшення глибини розповсюдження хмари НХР для кожного 1 км довжини закритої місцевост
        console.log(
                "Кзм - коефіцієнт зменшення глибини розповсюдження хмари НХР` ",
                kzm
        );

        const deptDecr = getDeptDecr(place.leng, kzm); //Гзм - величина, на яку зменшується глибина розповсюдження хмари НХР
        console.log(
                "Гзм - величина, на яку зменшується глибина розповсюдження хмари НХР` ",
                deptDecr
        );

        const deptCalculatedZone = getDeptCalculatedZone(tablDeptZone, ksx, deptDecr); //розрахункової глибини отримане значення Гр
        console.log(
                "розрахункової глибини отримане значення Гр ` ",
                deptCalculatedZone
        );

        const transferSpeed = await workWithBD("v_transfer", routerName, {
                windSpeed,
                degreeOfVerticalStability,
        }); //W - швидкість переносу повітряних мас
        console.log("W - швидкість переносу повітряних мас ` ", transferSpeed);

        const deptTramsfer = getDeptTransfer(transferSpeed); //глибини переносу повітряних мас Гп
        console.log("глибини переносу повітряних мас Гп` ", deptTramsfer);

        const forecastDeptZone = getForecastDeptZone(
                deptCalculatedZone,
                deptTramsfer
        ); //за фактичну прогнозовану глибину зони забруднення, тобто Гпзхз
        console.log(
                "за фактичну прогнозовану глибину зони забруднення, тобто Гпзхз` ",
                forecastDeptZone
        );

        zoom = forecastDeptZone > 10 ? 11 :  forecastDeptZone < 2 ? 13 : zoom;

        const widthForecastZone = getWidthForecastZone(
                degreeOfVerticalStability,
                forecastDeptZone
        ); //Ширина прогнозованої зони хімічного забруднення (Шпзхз)
        console.log(
                "Ширина прогнозованої зони хімічного забруднення (Шпзхз)` ",
                widthForecastZone
        );

        const F = getF(windSpeed); //Коефіцієнт Ф, який залежить від швидкості вітру
        console.log("Коефіцієнт Ф, який залежить від швидкості вітру ` ", F);

        const squarePossibleZone = getSquarePossibleZone(forecastDeptZone, F); //Площа зони можливого хімічного забруднення (ЗМХЗ).const
        console.log(
                "Площа зони можливого хімічного забруднення (ЗМХЗ)` ",
                squarePossibleZone
        );

        const K = getK(degreeOfVerticalStability); //де К – коефіціент
        console.log("де К – коефіціент` ", K);

        const N = 4; //N – час, на який розраховується глибина ПЗХЗ
        const squarePredictedZone = getSquarePredictedZone(K, forecastDeptZone, N); //Площа прогнозованої зони хімічного забруднення (ПЗХЗ)
        console.log(
                "Площа прогнозованої зони хімічного забруднення (ПЗХЗ) ` ",
                squarePredictedZone
        );

        const pollutionDuration = await workWithBD("pollution_duration", routerName, {
                nhrType,
                height,
                temperature,
                windSpeed,
        });
        console.log(
                "тривалості дії фактора хімічного забруднення  ` ",
                pollutionDuration
        );

        const percentOfLoss = await workWithBD("population_loss", routerName, {
                place: place.type,
                provGasMasl,
        });
        const peopleLoss = getPeopleLoss(peopleNum, percentOfLoss);
        console.log("потери людей ", peopleLoss);

        const meterperPixel = metersPerPixel(latitude, zoom);
        console.log("метров в пикселе: ", meterperPixel);

        await workWIthMap({
                        latitude,
                        longitude,
                },
                zoom,
                [forecastDeptZone, widthForecastZone],
                windAzimut
        );

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
        ]);

        let data = getData();
        console.log("array of pixels: ", data);

        let fieldInZone = findPixelsInZone(data, zoneBorderColorRGB, fieldColorRGB);
        let forestInZone = findPixelsInZone(data, zoneBorderColorRGB, forestColorRGB);
        let waterInZone = findPixelsInZone(data, zoneBorderColorRGB, waterColorRGB);
        console.log("fieldInZone ", fieldInZone);
        console.log("forestInZone ", forestInZone);
        console.log("waterInZone ", waterInZone);

        let fieldSqrt = getSqrt(meterperPixel, fieldInZone, data.length);
        let forestSqrt = getSqrt(meterperPixel, forestInZone, data.length);
        let waterSqrt = getSqrt(meterperPixel, waterInZone, data.length);

        console.log("fieldSqrt ", fieldSqrt);
        console.log("forestSqrt ", forestSqrt);
        console.log("waterSqrt ", waterSqrt);

        //TODO считатем все говно брат удачи силі и терпения

        let peopleLossDamage = getPeopleLossDamage(peopleLoss);
        console.log("peopleLossDamage ", peopleLossDamage);

        let cityInfoStr = await workWithBD("agriculture", routerName, {
                city,
        });
        let cityInfo = cityInfoStr.split("|");
        console.log(cityInfo);

        let agricultureDamage = getAgricultureDamage(
                fieldSqrt,
                cityInfo[0],
                cityInfo[1]
        );
        console.log("agricultureDamage ", agricultureDamage);

        let foresDamage = getForestDamage(forestSqrt, cityInfo[2]);
        console.log("foresDamage ", foresDamage);

        let waterDamage = 900 * waterSqrt;
        console.log("waterDamage ", waterDamage);

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
        ])
}

function createTable(domElementID, tableData) {
        let resultTable = document.querySelector(`#${domElementID}`);
        let table = document.createElement("table");
        let tableBody = document.createElement("tbody");

        tableData.forEach(function (rowData) {
                let row = document.createElement("tr");

                rowData.forEach(function (cellData) {
                        let cell = document.createElement("td");
                        cell.appendChild(document.createTextNode(cellData));
                        row.appendChild(cell);
                });

                tableBody.appendChild(row);
        });

        table.appendChild(tableBody);
        resultTable.appendChild(table);
}
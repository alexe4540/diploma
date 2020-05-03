const   routerName = "dbrouter",
        nhrType = "хлорпікрин", //        тип НХР                         c формы
        nhrQuantity = 70, //            количество НХР                  с формы
        height = 1, //                  высота обвалования              с формы
        temperature = 20, //            температура воздуха             с апихи погоды
        windSpeed = 4, //               скорость ветра                  с апихи погоды
        windAzimut = 270, //            угол/азимут ветра               с апихи погоды
        accidentTime = '12:00', //      время аварии                    с формы/автоматом
        cloudiness = "напівясно", //    облачность                      с апихи погоды
        place = { //                    инфа о местности                с формы
                type: "закрита",
                place: "Ліс",
                leng: 1,
        },
        peopleNum = 250, //             количество людей на обьекте     с формы
        provGasMasl = 60; //            обеспеченость людей химзащитой  с формы

console.log(nhrType, nhrQuantity, height, temperature, windSpeed, windAzimut, accidentTime, cloudiness, place, peopleNum, provGasMasl);

(async function () {
        const timeOfDay = getTimeOfDay(accidentTime); //Время суток
        console.log(timeOfDay);

        const degreeOfVerticalStability = await workWithBD('vertical', routerName, {timeOfDay, cloudiness, windSpeed}); //ступінь вертикальної стійкості
        console.log("tut1` ", degreeOfVerticalStability);

        const tablDeptZone = await workWithBD('tabledeptvalue', routerName, {nhrQuantity, nhrType, degreeOfVerticalStability, temperature, windSpeed}); //Гт - табличне значення глибини зони
        console.log("tut2` ", tablDeptZone);

        const ksx = await workWithBD('nhr_cloud', routerName, {nhrType, height}); //Ксх - коефіцієнт, що враховує тип сховища і характеризує зменшення глибини розповсюдження хмари НХР при виливі "у піддон"
        console.log("tut3` ", ksx);

        const kzm = await workWithBD('koef_kzm', routerName, {degreeOfVerticalStability, palce: place['place']}); //Кзм - коефіцієнт зменшення глибини розповсюдження хмари НХР для кожного 1 км довжини закритої місцевост
        console.log("tut4` ", kzm);

        const deptDecr = getDeptDecr(place.leng, kzm); //Гзм - величина, на яку зменшується глибина розповсюдження хмари НХР 
        console.log("tut5` ", deptDecr);

        const deptCalculatedZone = getDeptCalculatedZone(tablDeptZone, ksx, deptDecr); //розрахункової глибини отримане значення Гр 
        console.log("tut6` ", deptCalculatedZone);

        const transferSpeed = await workWithBD('v_transfer', routerName, {windSpeed, degreeOfVerticalStability}); //W - швидкість переносу повітряних мас 
        console.log("tut7` ", transferSpeed);

        const deptTramsfer = getDeptTransfer(transferSpeed); //глибини переносу повітряних мас Гп 
        console.log("tut8` ", deptTramsfer);

        const forecastDeptZone = getForecastDeptZone(deptCalculatedZone, deptTramsfer); //за фактичну прогнозовану глибину зони забруднення, тобто Гпзхз
        console.log("tut9` ", forecastDeptZone);

        const widthForecastZone = getWidthForecastZone(degreeOfVerticalStability, forecastDeptZone); //Ширина прогнозованої зони хімічного забруднення (Шпзхз)
        console.log("tut10` ", widthForecastZone);

        const F = getF(windSpeed); //Коефіцієнт Ф, який залежить від швидкості вітру 
        console.log("tut11` ", F);

        const squarePossibleZone = getSquarePossibleZone(forecastDeptZone, F); //Площа зони можливого хімічного забруднення (ЗМХЗ).const
        console.log("tut12` ", squarePossibleZone);

        const K = getK(degreeOfVerticalStability); //де К – коефіціент
        console.log("tut13` ", K);

        const N = 4; //N – час, на який розраховується глибина ПЗХЗ 
        const squarePredictedZone = getSquarePredictedZone(K, forecastDeptZone, N); //Площа прогнозованої зони хімічного забруднення (ПЗХЗ) 
        console.log("tut14` ", squarePredictedZone);

        workWIthMap({latitude: 50.8774569, longitude: 34.88522929}, 13, [forecastDeptZone, widthForecastZone], windAzimut);

        //moveToCoordinates(50.8774569, 34.88522929, 12);
})();
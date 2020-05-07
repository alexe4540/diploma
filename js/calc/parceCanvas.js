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
    let data = ctx.getImageData(0, 0, c.width, c.height)

    let arryaOfRGBAValue = unitArrayToREguralArray(data);
    return arryaOfRGBAValue;
}

function findPixelsInZone(data, zoneColor, pixelColor){
    let totalCounter = 0;
    let positionOfLastZonePixel;

    for (let row of data){
        let tmpCounter = 0;
        let countPixel = false;
        let addToTotalCount = false;
        for (let i = 0; i < row.length - 1; i++){
            if(row[i][0] === zoneColor.r && row[i][1] === zoneColor.g && row[i][2] === zoneColor.b){
                positionOfLastZonePixel = i;
            } else if(!countPixel && i - positionOfLastZonePixel === 1){
                countPixel = !countPixel;
            }
            
            if(countPixel){
                if(row[i][0] === pixelColor.r && row[i][1] === pixelColor.g && row[i][2] === pixelColor.b){
                    tmpCounter++;
                }
                if(row[i + 1][0] === zoneColor.r && row[i + 1][1] === zoneColor.g && row[i + 1][2] === zoneColor.b){
                    totalCounter += tmpCounter;
                    break;
                } 
            }
        }
    }

    return totalCounter;
}
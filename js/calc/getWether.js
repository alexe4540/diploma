const goButton = document.querySelector("#go");
const KEY = "199cb0b508acd58820ca7ed8fea3afb3";

function getWetherData(latitude, longitude, date){
    const url=`https://api.darksky.net/forecast/${KEY}/${latitude},${longitude},${date}?lang=uk&units=auto`;
    
    return getJSONWether(url);
}
var city = "portland";
var latLongUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyCLjaOmTbNl8M0ewJ5amY9cm6rytBGUVZM"

$.ajax({
    url: latLongUrl,
    method: "GET"
}).then(function(coordResponse){
    console.log(coordResponse)
    var lat = coordResponse.results[0].geometry.location.lat
    var long = coordResponse.results[0].geometry.location.lng
    var weatherUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=927924e4c73455c7286d71a6b1b45a4c";
    $.ajax({
        url: weatherUrl,
        method: "GET"
    }).then(function(weatherResponse){
        console.log(weatherResponse.daily[0].dt)
        var unixTime = weatherResponse.daily[0].dt;
        var timeInMilliSeconds = unixTime*1000;
        var date = new Date(timeInMilliSeconds);
        var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1); //adding leading 0 if month less than 10 for mm format. Used less than 9 because javascriptmonths are 0 based.
        var year = date.getFullYear(); //full year in yyyy format
        console.log(date)
        console.log(day)
        console.log(month)
        console.log(year)
    })

})
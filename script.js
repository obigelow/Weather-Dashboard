$("#search-button").on("click", function () {
    $(".future-weather").empty()
    var city = $("#city-search").val();
    var cityButton = $("<button>").text(city)
    cityButton.attr("class", "city-search-button")
    $(".city-buttons").append(cityButton)

    var latLongUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyCLjaOmTbNl8M0ewJ5amY9cm6rytBGUVZM"

    $.ajax({
        url: latLongUrl,
        method: "GET"
    }).then(function (coordResponse) {
        console.log(coordResponse)
        var lat = coordResponse.results[0].geometry.location.lat
        var long = coordResponse.results[0].geometry.location.lng
        var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=927924e4c73455c7286d71a6b1b45a4c";
        $.ajax({
            url: weatherUrl,
            method: "GET"
        }).then(function (weatherResponse) {
            console.log(weatherResponse)

            dateArray = [];
            tempArray = [];

            for (var i = 0; i < 6; i++) {

                var unixTime = weatherResponse.daily[i].dt;
                var timeInMilliSeconds = unixTime * 1000;
                var date = new Date(timeInMilliSeconds);
                var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
                var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1); 
                var year = date.getFullYear(); 
                dateArray.push(month + "/" + day + "/" + year)

                var temp = weatherResponse.daily[i].temp.max
                temp = temp - 273;
                temp = temp * (9 / 5);
                temp = temp + 32;
                temp = temp.toFixed(1)
                tempArray.push(temp)

                var futureDiv = $("<div>")
                var futureDate = $("<p>").text(dateArray[i])
                var futureTemp = $("<p>").text(tempArray[i] + " F")
                var futureHumid = $("<p>").text(weatherResponse.daily[i].humidity)

                futureDiv.attr("class", "future-forecast")

                futureDiv.append(futureDate, futureTemp, futureHumid)
                $(".future-weather").append(futureDiv)
               

            }
            
            var currentDiv = $("<div>")
            var currentCity = $("<p>").text(city)
            var currentDate = $("<p>").text(dateArray[0])
            var currentTemp = $("<p>").text(tempArray[0] + " F")
            var currentHumid = $("<p>").text(weatherResponse.daily[0].humidity)
            var currentWind = $("<p>").text(weatherResponse.daily[0].wind_speed)
            var currentUVI = $("<p>").text(weatherResponse.daily[0].uvi)

            currentDiv.append(currentCity, currentDate, currentTemp, currentHumid, currentWind, currentUVI)
            $(".current-weather").html(currentDiv)


        })
    })

})
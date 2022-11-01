// city
var city = "";
// city searched
var citySearched = JSON.parse(localStorage.getItem("history")) || []; 
// curent date & time
var date = moment().format('MMMM Do YYYY, h:mm:ss a'); 
// Api Key
var key = "7eb77816dcc99ae2a3625aa6fdd7fd5c" 


function getInfo() {
      
    /* today's weather */
    function getApi() {
               fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=7eb77816dcc99ae2a3625aa6fdd7fd5c")
            .then(function (data) {
                return data.json();
            }).then(function (data) {
                
                $("#current").empty();
                let today = data;
                let current = $('.current')
                let currentinfo = $("<div>");
                let time = $("#fetch-elm").addClass("date-of");                                
                let showcity = $("<h3>").addClass("pickedcity").text("").append(city);          
                let moment = $("<h4>").addClass("current-time").text(date);       
                let degree = $("<p>").addClass("lead").text(Math.round(today.main.temp) + "˚C");
                let humidity = $("<p>").addClass("humidity").text("Humidity: " + today.main.humidity + "%");
                let wind = $("<p>").addClass("wind").text("Wind Speed: " + Math.round(today.wind.speed) + " mph");
                let icon = $("<img>").addClass("rounded mx-auto d-block");
                icon.attr("src", "http://openweathermap.org/img/wn/" + today.weather[0].icon + "@2x.png");
                let iconMain = $("<p>").text(today.weather[0].main).addClass("iconexp");
                $("#current").append(currentinfo.append(time, showcity, moment, degree, humidity, wind, icon, iconMain));
                $("#one-day").append(current);


                
            })
    }


    /* The next 5 days Weather */
    function fiveDaysApi() {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=7eb77816dcc99ae2a3625aa6fdd7fd5c")
            .then(function (data) {
                return data.json();
            }).then(function (data) {
                $("#fetch-five").empty();
                console.log(data);
                for (let i = 1; i < 35; i += 8) {
                    let days = data.list[i];                   
                    let cards = $('.fetch-five');
                    let cardInit = $("<div>").addClass("col-sm-2 whole");
                    let cardDay = $("<h2>").text(days.dt_txt.slice(0, 10));
                    let degree = $("<p>").text(Math.round(days.main.temp) + "˚C");
                    let humid = $("<p>").text("Humidity: " + days.main.humidity + "%");
                    let wind = $("<p>").text("wind Speed: " + Math.round(days.wind.speed) + " mph");
                    let icon = $("<img>");
                    icon.attr("src", "http://openweathermap.org/img/wn/" + days.weather[0].icon + "@2x.png");
                    $("#fetch-five").append(cardInit.append(cardDay, degree, icon, humid, wind));
                    $("#five-days").append(cards);
                }
            })
    }


    /* Cities searched history function */
    function searchedCities() {
        $("#searched").empty();
        for (let i = 0; i < citySearched.length; i++) {
            let el = $("<p class='history'>");
            el.attr("data", citySearched[i]);
            el.text(citySearched[i]);
            $("#searched").append(el);

        }

    }


    /* upon click function */
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        city = $("#given-input").val().trim();

        if (!citySearched.includes(city)) {
            (citySearched).push(city);
        }
        if (citySearched.length > 5) {
            citySearched.shift();
        }

        searchedCities();
        getApi();
        fiveDaysApi();
        localStorage.setItem("history", JSON.stringify(citySearched));
        $("#given-input").val("");
        $("#issues").css('display', 'block');
    });

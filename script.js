$(document).ready(function() {
  getLocation("imperial");

  function getLocation(units) {
    $.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?')
      .done(function(location) {
        getWeather(location, units);
      });
  }

  function getWeather(location, units) {
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + location.latitude + "&lon=" + location.longitude + "&units=" + units + "&appid=8509c56933d3a8bdfd285c2e7d76973b";
    var unitLetter;

    if (units === "imperial") {
      unitLetter = "F";
    } else if (units === "metric") {
      unitLetter = "C";
    }
    
    $.ajax({
      url: url,
      dataType: "jsonp",
      success: function(response) {
        $("#cityCountry").text(response.name + ", " + response.sys.country);
        $("#temperature").html(response.main.temp + " \u00B0" + "<a id='unitsLink' href='#'>" + unitLetter + "</a>");
        $("#icon").html("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
        $("#status").text(response.weather[0].main);
        $("#unitsLink").click(function(e) {
          if ($("#unitsLink").text() === "F") {
            getLocation("metric");
          } else if ($("#unitsLink").text() === "C") {
            getLocation("imperial");
          }
        });
      }
    });
  }
});
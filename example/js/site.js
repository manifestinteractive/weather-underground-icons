(function () {

  /**
   * Your Required Weather Underground API Key
   * @link https://www.wunderground.com/weather/api/
   * @type {string}
   */
  var API_KEY = '';

  /**
   * Weather Unit
   * Choose Either F or C
   * @type {string}
   */
  var WEATHER_UNIT = 'F';

  /**
   * Track if making WU Ajax Call
   * @type {boolean}
   */
  var fetchingWeather = false;

  /**
   * Fetch Weather for provided Zipcode
   * @param zipcode
   */
  function getWeather (zipcode) {
    $('.weather-input .error-message').fadeOut();

    fetchingWeather = true;

    if (!/[0-9]{5}/.test(zipcode)) {
      showError('Invalid Zipcode');
      return false;
    } else if (API_KEY == '') {
      showError('Invalid Weather Underground API Key');
      return false;
    }

    var weatherUrl = 'https://api.wunderground.com/api/' + API_KEY + '/forecast/q/zmw:' + zipcode + '.1.99999.json';

    $.ajax({
      url: weatherUrl,
      jsonp: 'callback',
      dataType: 'jsonp',
      success: function( data ) {
        fetchingWeather = false;
        if (data.response.error) {
          showError(data.response.error.description);
        } else {
          buildForcast(zipcode, data.forecast.simpleforecast.forecastday);
        }
      }
    });
  }

  /**
   * Build Weather Forecast
   * @param zipcode
   * @param forecast
   */
  function buildForcast (zipcode, forecast) {
    for (var i = 0; i < forecast.length; i++) {
      var date = '<div class="weather-date">' + forecast[i].date.monthname_short + ' ' + forecast[i].date.day + '</div>';
      var image = weatherIcon(forecast[i].icon);
      var high = (WEATHER_UNIT == 'F') ? forecast[i].high.fahrenheit : forecast[i].high.celsius;
      var low = (WEATHER_UNIT == 'F') ? forecast[i].low.fahrenheit : forecast[i].low.celsius;

      var weather = '<div class="weather-details">' + low + '&deg; / ' + high + '&deg;</div>';

      $('.day-' + ( i + 1)).html(date + image + weather);
    }

    $('.weather-forecast .header').text(zipcode + ' Forecast');
    $('.weather-input').fadeOut(100);
    $('.weather-forecast').fadeIn(100);
  }

  /**
   * Get local image for WU icon
   * Copy whatever set of icons you want from the following URL and drop them in your /img/icons folder
   * @link https://github.com/manifestinteractive/weather-underground-icons
   * @param icon
   */
  function weatherIcon (icon) {
    return '<img src="img/icons/' + icon + '.svg">';
  }

  /**
   * Show Error Message
   * @param message
   */
  function showError (message) {
    $('.weather-input .error-message').text(message).fadeIn(100);
  }

  /**
   * Reset User Interface
   */
  function reset () {
    fetchingWeather = false;
    $('#zipcode').val('');
    $('.weather-input').fadeIn(100);
    $('.weather-forecast').fadeOut(100);
    $('.weather-input .error-message').text('').hide();

    setTimeout(function(){
      $('#zipcode').focus();
    }, 200);
  }

  /**
   * Load on Document Ready
   */
  $(function() {
    var elmZipcode = $('#zipcode');
    var elmBackButton = $('.back-button a');

    elmZipcode.on('keydown', function(e)  {
      var key = e.charCode || e.keyCode || 0;
      return (key == 8 || key == 9 || key == 13 || key == 46 || key == 110 || key == 190 || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
    });

    elmZipcode.on('keyup', function() {
      var zipcode = $(this).val();
      if (!fetchingWeather && zipcode && zipcode.length === 5) {
        getWeather(zipcode);
      }
    });

    elmBackButton.on('click', function(e) {
      reset();
      e.preventDefault();
    });
  });

})();
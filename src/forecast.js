/*
Get's a detailed weather forecast based on the lat an lng passed in
*/
const request = require('request');

module.exports = (location, callback) => {
  
  const requestOptions = {
    uri: `https://api.weather.gov/points/${location.lat},${location.lng}`,
    json: true,
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/73.0.3683.86 Chrome/73.0.3683.86 Safari/537.36'
    }
  };

  // this will give us another URI to traverse to get the final forecast, weird, but that's how they do it...
  request(requestOptions, (err, res, data) => {
    
    if (err) {
      callback(error);
    }

    // the URI to the forecast for our location
    requestOptions.uri = data.properties.forecast;

    request(requestOptions, (error, response, forecast) => {
    
      if (error) {
        callback(error);
      }
    
      callback(undefined, forecast.properties.periods[0].detailedForecast);
    });

  });
};
// get the lat and lon based on a city name from some 3rd party API

const request = require('request');

module.exports = (city, callback) => {

  const requestOptions = {
    // the api uri
    uri: "https://api.geocod.io/v1.3/geocode",
    // query string params
    qs: {
      city,
      api_key: '3ecdb9caa4a054c34e47c70345cc7054ceddc6c'
    },
    // we know we will get JSON, so go ahead and parse the JSON response
    json: true
  }

  request(requestOptions, (err, res, body) => {
    if (err) {
      callback(err);
    }
    // gives us an object with {lat, lng}
    callback(undefined, body.results[0].location);
  });
};
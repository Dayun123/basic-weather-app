// get the lat and lon based on a city name from some 3rd party API

const request = require('request');

const requestOptions = {
  uri: "https://api.geocod.io/v1.3/geocode",
  qs: {
    city: 'New%20Orleans',
    api_key: '3ecdb9caa4a054c34e47c70345cc7054ceddc6c'
  },
  json: true
}

request(requestOptions, (err, res, body) => {
  if (err) {
    console.log(err);
  }
  // gives us an object with {lat, lng}
  console.log(body.results[0].location);
});
const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocoder = require('./geocoder');
const forecast = require('./forecast');

const app = express();
const port = process.env.PORT || 3000;

const webrootPath = path.join(__dirname, '..');
const publicPath = path.join(webrootPath, '/public');
const viewsPath = path.join(webrootPath, '/templates/views');
const partialsPath = path.join(webrootPath, '/templates/partials');

app.use(express.static(publicPath));

app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'Weather'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    pageTitle: 'Help'
  });
});

// JSON endpoint for the fetch call
app.get('/weather', (req, res) => {
  // make sure there is a query string
  if (!req.query.city) {
    return res.json({
      error: true,
      msg: 'You must search for a location!'
    });
  }
  // make a call to the geocoder and forecast API's and return the forecast to the client
  geocoder(req.query.city, (error, location) => {
    if (error) {
      return console.log(error);
    }
    forecast(location, (error, detailedForecast) => {
      if (error) {
        return console.log(error);
      }
      res.json({
      error: false,
      msg: `Here is the weather for ${req.query.city}. ${detailedForecast}`
      });
    });
    
  });
  
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
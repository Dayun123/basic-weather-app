const path = require('path');

const express = require('express');
const hbs = require('hbs');

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

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.json({
      error: true,
      msg: 'You must search for a location!'
    });
  }
  // make a call to the geocoder and forecast API's and return the forecast to the client
  res.json({
    error: false,
    msg: `Here is the weather for ${req.query.address}. Partly cloudy with a high of 80.`
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
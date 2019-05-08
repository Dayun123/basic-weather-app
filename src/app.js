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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
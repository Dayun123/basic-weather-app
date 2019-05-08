const path = require('path');

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const webrootPath = path.join(__dirname, '..');
const viewsPath = path.join(webrootPath, '/templates/views');
const publicPath = path.join(webrootPath, '/public');

app.use(express.static(publicPath));

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
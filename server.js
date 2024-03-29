const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '2505b29b62b6f1f3b005a797918852ee';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index', { weather: null, error: null });
});

app.post('/', function (req, res) {
    let city = req.body.city;
    if (!city) {
        res.render('index', { weather: null, error: 'Please enter a city name.' });
        return;
    }
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error connecting to weather service. Please try again later.' });
        } else {
            let weather = JSON.parse(body);
            if (weather.cod && weather.message) {
                res.render('index', { weather: null, error: `Error: ${weather.message}` });
            } else {
                res.render('index', { weather: weather, error: null });
            }
        }
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

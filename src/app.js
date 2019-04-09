const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const PORT = process.env.PORT || 3001;


//Define Paths for Express Config
const publicPath = path.join(__dirname,'../public');
app.use(express.static(path.join(__dirname, 'css')));
const viewsPath = path.join(__dirname, '../templates/views');
const partsPath = path.join(__dirname, '../templates/partials');


//Setup (app.set) the handlebars,dynamic template, and views new location.
app.set('view engine','hbs');
app.set('views' ,viewsPath);
hbs.registerPartials(partsPath);

//Setup static directory to serve
app.use(express.static(publicPath));



app.get('', (req, res) => {
    console.log(req);
   res.render('index',{
       title: 'Weather App',
       name: 'Tamir'
   });
});
app.get('/about', (req, res) => {
    console.log(req);
    res.render('about',{
        title: 'Weather App, About section',
        name: 'Tamir'
    });
});
app.get('/help', (req, res) => {
    console.log(req);
    res.render('help',{
        title: 'Weather App, Help Section',
        msg: ' Bla Bla Bla bla bla bla ',
        name: 'Tamir'
    });
});




app.get('/weather', (req, res) => {

    const query = req.query;
    if(!query.location){
        res.send({
            error: 'No location provided'
        })
    }

    geocode(query.location, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({ error });
        }
        forecast({longitude, latitude, location}, (error, fdata) => {
            if(error){
                return res.send({error});
            }
            res.send({
                forecast: fdata,
                location,
                address: query.location,
                longitude,
                latitude
            })
        })
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        msg: 'This helping page was not found'
    })
});
app.get('*', (req, res) => {
   res.render('404', {
       title: 404,
       name: 'Tamir',
       msg: 'This page was not found'
   })
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
});
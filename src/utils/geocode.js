const request = require('request');
const chalk = require('chalk');

const geocode = (address ,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZHVhbmkiLCJhIjoiY2p1NDNpenUwMHR1ODN5cHZ5azFiM2hpMCJ9.TbFkvldqcwLLLg0egttufg`;
    request({url, json: true}, (error, {body}) => {
        console.log(body.features);
        if (error){

            callback(`${chalk.red(`(LOW LEVEL) Error accoured \n`+ error)}`, undefined);
        }
        else if(undefined === body.features.length|| body.features.length === 0){
            callback(`Error: unable to find location`, undefined);
        }
        else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:  body.features[0].place_name
            })
        }
    });
};


module.exports = geocode;
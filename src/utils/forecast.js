const chalk = require('chalk');
const request = require('request');


const forecast = (location , callback ) => {
    const {latitude, longitude} = location;
    if (latitude === undefined || longitude === undefined ) {
        console.log(`${chalk.red(`Coordinates are Invalid or not given\nTry again with Valid ones`)}`)
    }
    else{
        const time = new Date;
        const url =`https://api.darksky.net/forecast/0ad18f2298d3aa35d3372f41acda4ecd/${location.latitude},${location.longitude}?units=si&lang=en`;
        request({url , json:true} ,(err, {body}) => {

            if(err){
                callback(`${chalk.red(`(LOW LEVEL) Error accoured \n`+ error)}` ,undefined);
            }
            else if(body.error){
                callback(`${chalk.yellow(`Error: unable to find location, fix the coordinates`)}` ,undefined);
            }
            else{
                callback(undefined, `(Time: ${time}), ${body.daily.summary} It is currently ${body.currently.temperature} degrees out.There is a ${body.currently.precipProbability + '%'} chance of rain!`);
            }
        })
    }
};

module.exports = forecast;
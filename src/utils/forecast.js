const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0c88eac0ba814c538168211a48f7108e/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'

    request({ url, json: true }, (error, { body }) => { //Destructured from response.body.somethingElse
        const summary = body.daily.data[0].summary
        const temp = body.currently.temperature
        const precip = body.currently.precipProbability

        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${summary} It is currently ${temp}°C out and there is a ${precip}% chance of rain today.`) 
        }
    })
}


module.exports = forecast
const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3d300706b80b2594d8df94bc0dbf18bd&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, {body}) => {
        const {error:bodyError, current} = body
        if (error) {
            callback('Unable to access weather service!', undefined)
        } else if (bodyError) {
            callback('Unable to find location', undefined)
        } else {
            const {weather_descriptions, temperature, feelslike} = current
            callback(undefined, weather_descriptions[0] + '. It is currently ' + 
                     temperature + ' degrees out. It feels like ' + 
                     feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast
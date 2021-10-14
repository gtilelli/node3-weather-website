const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3RpbGVsbGkiLCJhIjoiY2t1bWhuYmR1MjlodjMxdDR3ODdsaDBkdyJ9.rUveBBS0c59CtpnobtGvhw&limit=1'
    request({ url, json: true }, (error, {body} = {}) => {
        if (error || body.message) {
            callback('Unable to access geocoding service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find geocode for location. Please try other search terms.', undefined)
        } else {
            callback( undefined, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0],
                location:  body.features[0].place_name
            } )
        }
    })
}

module.exports = geocode
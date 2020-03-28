const req = require('request')
const getLocation = (loc,callback)=>{
    const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(loc)+'.json?access_token=pk.eyJ1IjoiYWJoaXNoZWtwYW5kZXkxMyIsImEiOiJjazBkZmY4dTAwNnZxM2ltcWFrZHU4dHVnIn0.KF-KeqxQ3Tua25FFvweQBg'
    req({url : url1, json:true}, (error,{body}) =>{
        if(error){
            callback('unable to connect to the internet.',undefined)
        }else if(body.features.length === 0){
            callback('unable to find the location',undefined)
        }
        else{
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                le : body.features[0].place_name
            })
        }
    })
}

module.exports = getLocation;
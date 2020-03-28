const req = require('request')
const location = (lat , long, callback) =>{
    const url = 'https://api.darksky.net/forecast/88b019e1aa1f1773d3170362748e07c6/'+lat+','+long+'?units=si'
    req({url,json:true},(error,{body}) => {         //using destructuring. destructired res object. also property shorthand
        if(error){
            callback('unable to connect to the internet.',undefined)
        }else if(body.error){
            callback('unable to find the location',undefined)
        }else{
            callback(undefined,{
                summary : body.daily.data[0].summary,
                tempHigh : body.daily.data[0].temperatureHigh,
                tempLow : body.daily.data[0].temperatureLow,
                uv : body.daily.data[0].uvIndex
            })
        }
    })
}

//72.83333,18.96667  https://api.darksky.net/forecast/88b019e1aa1f1773d3170362748e07c6/72.83,18.966?units=si
module.exports = location;


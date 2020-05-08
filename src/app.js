const path = require('path')
const express = require('express')
const hbs = require('hbs')
const req = require('request')
const getLocation = require ('./utils/geoLocation')
const location = require('./utils/getLocation')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abhishek Pandey'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abhishek Pandey'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Abhishek Pandey'
    })
})

app.get('/weather', (req, res) => {
    address=req.query.address
    if(!address){
        return res.send({
            error: "No address provided"
        })
    }

    getLocation(address ,(error,{latitude,longitude,le}={})=>{  //used destructing also set up an empty default object.

        if(error){
            return res.send({error})
        }
        //console.log(data.latitude)
        long=longitude
        lat = latitude
        //long=data.longitude
        location(lat,long,(error,{summary,tempHigh,tempLow,uv})=>{   //used destructing
            if(error){
                return res.send({error})
            }
            // res.send(le)
            // res.send(summary, "with a high of",tempHigh , "and low of" ,tempLow)
            res.send({
                place : le,
                summary: summary,
                HighTemp : tempHigh,
                LowTemp : tempLow,
                uvIndex : uv 
            })
        })
    })

})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "you must provide search"
        })
    }
    console.log(req.query.search)
    res.send({
        product : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404_page', {
        title: '404',
        name: 'Abhishek',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404_page', {
        title: '404',
        name: 'Abhishek Pandey',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})
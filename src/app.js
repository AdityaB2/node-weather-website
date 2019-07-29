const path=require('path')
const express=require('express')

const hbs=require('hbs')
const geocode=require('./util/geocode')
const forecast=require('./util/forecast')

const app=express()
const port=process.env.PORT || 8080

//console.log(__dirname)


//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')
// })




// app.get('',(req,res)=>{
//     res.render('index')
// })

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Aditya'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Aditya'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        text: 'This is a help window',
        title: 'Help',
        name: 'Aditya'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

// app.get('/help',(req,res)=>{
//     res.send([{
//         name: 'Aditya'
//     },
//     {
//         name: 'Ranjan'
//     }])
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Aditya',
        errorMessage:'Help article not Found.'

    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Aditya',
        errorMessage:'Page Not Found.'
    })
})



app.listen(port, ()=>{
    console.log('Server is running on port '+port)
})
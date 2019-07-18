const path=require('path')//For cross browser compatbility
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express();
console.log(__dirname)
console.log(path.join(__dirname,'../public'))


//Define paths for Express config

const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('/',(req,res)=>{
    res.render('index', {title:'Weather app',
    name:'Eshwar'})
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Weather app',
        name:'Eshwar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'Any queries',
        name:'Eshwar'
    })
})

app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send("No address provided")
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error)
        {
            return res.send({error:error})
        } 
        forecast(longitude,latitude,(error,forecastData)=>{
            if(error){
                return res.send({error:error})
            }else{
                 res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                    
                })
                }
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
       return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
res.render('404',{
    title:'404',
    name:'Eshwar',error:'Page not found'
})
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Eshwar',
        error:'Page not found'
    })
})
app.listen(5000,()=>{
    console.log("Listening on 5000",)
   
})
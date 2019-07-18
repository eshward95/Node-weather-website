const request=require('request');
const forecast=(lat,long,callback)=>
{
    const url='https://api.darksky.net/forecast/bb717327d19ac4958f95c2f346006c3f/'+ lat +','+ long
    request({url,json:true},(error,{body})=>
    {
        if(error)
        {
            callback("Unable to connect this",undefined)
        }
        else if(body.error)
    {
        callback("Error for this",undefined)
    }
        {
            callback(undefined,body.daily.data[0].summary+'It is currently '+body.currently.temperature+' degrees out.'+'The high today is '+body.daily.data[0].temperatureHigh+' with a low of'+' There is a '+body.daily.data[0].temperatureLow + body.currently.precipProbability + '% chance of rain.'
                )
        }
    })
}
module.exports=forecast
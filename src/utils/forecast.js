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
            callback(undefined,body.daily.data[0].summary+'It is currently '+body.currently.temperature+' degrees out'+' There is a ' + body.currently.precipProbability + '% chance of rain.'
                )
        }
    })
}
module.exports=forecast
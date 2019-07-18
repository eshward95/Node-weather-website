
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
     response.json().then((data)=>{
         console.log(data)
     })
})


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.getElementById('message-1')
const message2=document.getElementById('message-2')

// message1.textContent='From javascript'
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    message1.textContent='Loading..'
    const location=search.value
    console.log(location)
    fetch('http://localhost:5000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            console.log("Error")
            message1.textContent=data.error
        }
        else{console.log(data.location,data.forecast)
            message1.textContent=data.forecast
            message2.textContent=data.location
           
        }
        
    })
})
})

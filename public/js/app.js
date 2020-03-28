
const loc = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')



loc.addEventListener('submit', (e)=>{
    e.preventDefault()
    msg1.textContent = 'loading'
    msg2.textContent = ''
    // const location = search.value
    // console.log(location)
    const url = '/weather?address='
    fetch(url+search.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = data.error
            }else{
                msg1.textContent = data.place
                msg2.textContent = data.summary + "With a high of  " + data.HighTemp + " and a low of " + data.LowTemp
            }
        })
    })
})
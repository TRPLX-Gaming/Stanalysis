
fetch('https:/rdk-backend.onrender.com/',{
//fetch('http://localhost:3000/',{
  method: 'GET',
  headers: {
    'X-RDK-Auth':'@ghTY!e$u7?8+U9Ih',
    'X-Client-Name':'TRPLXttyuf'
  }
})
.then(res => {
  if(res.ok) {
    console.log('success')
    return res.json()
  } else {
    console.error(`Err cuz: ${res.status} and ${res.statusText}`)
  }
})
.then(data => {
  if(data) {
    console.log(data.message)
  }
})
.catch(err => {
  console.error(err)
})

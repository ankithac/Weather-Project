const express = require('express')

const app = express()
const https = require('https')


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")

})


app.post("/",function(req,res){
  var cityName = req.body.city;

  const i ="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=c794dfd22b116f9171dbd9fb092fd8d9&units=metric";
  https.get(i,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData = JSON.parse(data)
      console.log(weatherData);
      console.log(weatherData.main.temp);
      console.log(weatherData.weather[0].description);
      const icon = weatherData.weather[0].icon;
      console.log(icon);
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
       res.write("<h1>The temperature in "+ cityName+" is "+weatherData.main.temp+" degrees. The weather is currently "+weatherData.weather[0].description+"</h1")
      res.write("<img src="+imageURL+">")
       res.send()
  })
  })

})

app.listen(3000,function(){
  console.log("The server is running on the port 3000");
})

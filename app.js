require('dotenv').config(); 
const express=require('express');
const https=require("https");
const bp= require('body-parser');
const app=express();
app.use(bp.urlencoded({extended:true}));
const data=require(__dirname+'/secret.js');
app.get("/",function(req,res){ 
    res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
    const query=req.body.cityname;
    //const apikey="d60a841ee5fa99f8c89d9a53d0bb56fc//dbf07aa1e065b45c646a97fde8931f81"
    const unit="metric";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${query},India&units=metric&appid=66095974314008527346691336b1d9da`
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            const tmp=weatherData.main.temp;
            const wthrdes=weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            res.write("<h1>The weather is currently "+wthrdes+"</h1>");
            res.write("<h1>The temperature in "+query+ " is "+tmp+" degrees Celsius.</h1>");
            res.send(); 
        });
    });
});
 
app.listen(4000,function(){
    console.log("SERVER IS RUNNING ON PORT 4000.");
}); 
const { response } = require("express");
const express=require("express");
const https=require("https");
const body_parser=require("body-parser");
const app=express();

app.use(body_parser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});


app.post("/",(req,res)=>{

    var cityname=req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+"enter your API ID"+"&units=metric"
    https.get(url,function(response){
    
    if(response.statusCode==200){
    response.on("data",(data)=>{    
        const weatherdata=JSON.parse(data);
        const temperature=weatherdata.main.temp;
        const description=weatherdata.weather[0].description;
        const icon=weatherdata.weather[0].icon;
        const url="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        
        res.write("<h1>The current Temperature is "+temperature+"C</h1>")
        res.write("<h3>the weather condition is "+description+" </h3>");
        res.write("<img src="+url+">");
        res.send(); 
    });
}
else {console.log("cannot search");
        res.send("<h1> Please enter a valid city!!</h1>");
}
});
});

app.listen(3000,()=>{
    console.log("server started at port 3000");
});


const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();
const PORT = 5000;
const API = process.env.API;

app.get('/',(req,res)=>{
    try{
        const location = req.query.address;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API}&units=metric`;

        if(!location){
            return res.status(500).send("No location provided");
        }

        axios.get(url)
            .then((response)=>{
                const data = response.data;
                const cityName = data.name;
                const country = data.sys.country;
                const temperature = data.main.temp;
                const feels_like = data.main.feels_like;
                const pressure = data.main.pressure;
                const humidity = data.main.humidity;
                const description = data.weather[0].description;

                const message = `City : ${cityName}<br>Country : ${country}<br>Temperature : ${temperature}<br>Feels Like : ${feels_like}<br>Pressure : ${pressure}<br>Humidity : ${humidity}<br>Description : ${description}`;

                return res.send(`<html><body><div id="container"><h1>${message}</h1></div></body></html>`);
            })
            .catch((error)=>{
                console.error(error);
                return res.status(500).send("Error Occured");
            });
    }
    catch(error){
        console.log(error);
        return res.status(500).send("Error Occured");
    }
});

app.listen(PORT,()=>{
    console.log(`Application running on port ${PORT}`);
})
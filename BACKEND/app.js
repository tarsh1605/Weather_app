const express=require('express');
const dotenv=require('dotenv');
const axios=require('axios')
// const redis = require('redis');
// const rateLimit = require('express-rate-limit');
const app=express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
dotenv.config();
const PORT=process.env.PORT||5000;
const WEATHER_API_KEY=process.env.WEATHER_API_KEY


const startServer=async()=>{
  try{
    app.listen(PORT,()=>{
      console.log("Server running");
    })
  }
  catch(e){
    console.log(e,"Server not Started");
  }
}
app.get('/',async(req,res)=>{
  return res.json({message:'Hello'})
})
app.get('/api/weather',async(req,res)=>{
  const city=req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'City parameter is required.' });
}
  try{
    const latAndLongUrl=`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.LOCATION_API_KEY}`;
    // const latAndLongUrl=`http://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid=${process.env.LOCATION_API_KEY}`;
    const response=await axios.get(latAndLongUrl);
    const lat=response.data[0].lat;
    // console.log(lat)
    // console.log(long)
    const long=response.data[0].lon;
    try{
      const weatherURL=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=52f8874a124a3a461540bba055b08154`
      const response=await axios.get(weatherURL);
      console.log(response.data);
      // const temperature=response.data.main.temp;
      const finalResponse={
        temperature:(response.data.main.temp-273.15).toFixed(2),
        condition:response.data.weather[0].description
      }
      return res.json(finalResponse);
    }
    catch(err){
      console.log(err);
      return res.json({error:'Weather API error'})
    }
  }
  catch(e){
    // console.log(e,"Error in fetching locations")
    return res.status(500).json({error:'Location API error'})
  }
})
startServer();

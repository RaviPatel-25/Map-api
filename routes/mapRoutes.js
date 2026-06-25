const express=require('express');
const axios=require('axios');
const router=express.Router();

router.post('/route', async(req,res)=>{
 try{
  const {origin,destination}=req.body;
  const [olat,olng]=origin;
  const [dlat,dlng]=destination;
  const url=`https://router.project-osrm.org/route/v1/driving/${olng},${olat};${dlng},${dlat}?overview=full&geometries=geojson`;
  const response=await axios.get(url);
  const route=response.data.routes[0];
  res.json({
   distance_km:(route.distance/1000).toFixed(2),
   duration_min:(route.duration/60).toFixed(0),
   coordinates:route.geometry.coordinates
  });
 }catch(e){
  res.status(500).json({error:'Unable to fetch route'});
 }
});

module.exports=router;

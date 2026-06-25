class RaviMap{
 constructor(options){
  this.apiUrl=options.apiUrl;
  this.map=L.map(options.container).setView(options.center||[18.52,73.85], options.zoom||13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(this.map);
 }
 async showRoute(origin,destination){
  const res=await fetch(`${this.apiUrl}/route`,{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({origin,destination})
  });
  const data=await res.json();
  const pts=data.coordinates.map(c=>[c[1],c[0]]);
  if(this.routeLayer) this.map.removeLayer(this.routeLayer);
  this.routeLayer=L.polyline(pts,{weight:6}).addTo(this.map);
  this.map.fitBounds(this.routeLayer.getBounds());
  return data;
 }
}
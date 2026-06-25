const express=require('express');
const cors=require('cors');
const app=express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api', require('./routes/mapRoutes'));

app.get('/', (req,res)=>res.sendFile(__dirname+'/public/demo.html'));

const PORT=process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server running on ${PORT}`));

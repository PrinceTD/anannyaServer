const express = require('express');
const app = express()
var cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors());


// user:anannyaDb
// pass:5m4zTVCNavrDUj7J

app.get("/", (req, res)=>{
    res.send('hello from my first')
});


app.get('/users', (req, res)=>{
res.send("hear us ")
});



app.listen(port, ()=>{
    console.log("listing ", port);
});
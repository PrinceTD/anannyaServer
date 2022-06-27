const express = require('express');
const app = express()
const port = process.env.PORT || 5000


app.get("/", (req, res)=>{
    res.send('hello from my  busad first')
});


app.get('/users', (req, res)=>{
res.send("hear us ")
});



app.listen(port, ()=>{
    console.log("listing ", port);
});
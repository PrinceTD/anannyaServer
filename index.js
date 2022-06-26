const express = require('express');
const app = express()
const port = process.env.PORT || 5000


app.get("/", (req, res)=>{
    res.send('hello from my  busad first')
});

app.listen(port, ()=>{
    console.log("listing ", port);
});
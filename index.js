const express = require('express');
const app = express()
var cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gfnwb7o.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const database = client.db('anannya');
        const userCollection = database.collection('users');

        console.log("database succfully")


        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(result)
            res.json(result);
        })
    }
    finally {


        // await client.close();
    }
}

run().catch(console.dir);



app.get("/", (req, res) => {
    res.send('hello from my first')
});


app.listen(port, () => {
    console.log("listing ", port);
});
const express = require('express');
const app = express()
const ObjectId = require('mongodb').ObjectId
var cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gfnwb7o.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const database = client.db('anannya-fashion');
        const usersCollection = database.collection("users");
        const jewellaryEarringCollection = database.collection("EarRing");
        const necklaceCollection = database.collection("necklace");



        // necklace
        app.post("/necklace", async (req, res) => {
            const necklace = req.body;
            // console.log(necklace);
            const result = await necklaceCollection.insertOne(necklace);
            res.send(result);
        });

        app.get('/necklace', async (req, res) => {
            const necklaceAdd = necklaceCollection.find({});
            const Addnecklace = await necklaceAdd.toArray();
            res.json(Addnecklace)
        });

        app.get("/necklace/:id", async (req, res) => {
            const id = req.params.id;
            // console.log("hitting id", id);
            const query = { _id: ObjectId(id) };
            const necklaceProduct = await necklaceCollection.findOne(query)
            res.json(necklaceProduct);
        });

        app.delete("/nacklace/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await jewellaryEarringCollection.deleteOne(query);
            res.json(product);
        });

        // ear ring



        app.post("/earring", async (req, res) => {
            const ring = req.body;
            console.log(ring);
            const result = await jewellaryEarringCollection.insertOne(ring);
            res.send(result);
        });

        app.get('/earring', async (req, res) => {
            const earRing = jewellaryEarringCollection.find({});
            const ring = await earRing.toArray();
            res.json(ring)
        });

        app.get("/earring/:id", async (req, res) => {
            const id = req.params.id;
            console.log("hitting id", id);
            const query = { _id: ObjectId(id) };
            const earProduct = await jewellaryEarringCollection.findOne(query)
            res.json(earProduct);
        });

        app.delete("/earring/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await jewellaryEarringCollection.deleteOne(query);
            res.json(product);
        });




        // user api 
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            let isAdmin = false;
            if (user?.role === 'admin') {
                isAdmin = true
            }
            res.json({
                admin: isAdmin
            });
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);

            res.json(result);
        });

        app.put('/users', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const options = { upsert: true }
            const updateDoc = { $set: user };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.json(result);
        })

        app.put('/users/admin', async (req, res) => {
            const user = req.body;
            console.log('put', user)
            const filter = { email: user.email };
            const updateDoc = { $set: { role: 'admin' } };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result);
        });




        console.log("database succfully")



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
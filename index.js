const express = require('express');
const app = express()
var cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000

app.use(cors());


const uri = "mongodb+srv://anannyaDb:5m4zTVCNavrDUj7J@cluster0.gfnwb7o.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object

    const user = {
        name: 'korim',
        email: 'korim@gameil.com',
        nameq: 'korim',
        emaiql: 'korim@gameil.com'

    };
    collection.insertOne(user)
        .then(() => {
            console.log("inside usccessed")
        })
    console.log("hitting the database")
    // client.close();
});



// user:anannyaDb
// pass:5m4zTVCNavrDUj7J


// async function run() {
//     try {
//         await client.connect();
//         const database = client.db('women')
//         const usersCollection = database.collection('saree');
//         // create a doc
//         const doc = {
//             name: "bahadur",
//             email: "hasdgbfhy@gmail.com"
//         }
//         const result = await usersCollection.insertOne(doc);
//         console.log(result)
//     }
//     finally {
//         await client.close();
//     }

// }

// run().catch(console.dir)


app.get("/", (req, res) => {
    res.send('hello from my first')
});


app.get('/users', (req, res) => {
    res.send("hear us ")
});



app.listen(port, () => {
    console.log("listing ", port);
});
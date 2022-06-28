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

        const database = client.db('women');
        const servicesCollection = database.collection('pant');

        // post api
        app.post('/pant', async(req, res)=>{
            const service ={
                "name": "hello",
                "price" : "300",
                "description" : "সিলভার চোকার সেট!🌻সাথে কিউট দুল আছে!🥀নিজের করতে অথবা প্রিয়জন কে খুশি করতে নিয়ে নিতে পারেন সেট টি! বিস্তারিত জানতে আমাদের পেইজে ইনবক্স করুন ছবি সহ❤️ বিঃদ্রঃ অনুমতি ছাড়া পেইজের কোনো ছবি অন্যকোথাও ব্যবহার করা নিষেধ ❌",
                "img" : "https://scontent.fdac137-1.fna.fbcdn.net/v/t39.30808-6/287512436_743710577061110_5313730503848806276_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=zH8Fx8QNBAIAX_m7coq&_nc_ht=scontent.fdac137-1.fna&oh=00_AT8M-Dk8zUyeOcfnA2ghoMEt4ZFfYyEfI6cxFk2An8gwHg&oe=62C028CE"
            }
            const result = await servicesCollection.insertOne(service);
            console.log(result);
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
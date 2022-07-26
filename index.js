const express = require('express');
const app = express()
const ObjectId = require('mongodb').ObjectId
var cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use(fileUpload());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gfnwb7o.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const database = client.db('anannya-fashion');
        const usersCollection = database.collection("users");
        const jewellaryEarringCollection = database.collection("EarRing");
        const necklaceCollection = database.collection("necklace");
        const KurtiCollection = database.collection("kurti");
        const bestSellsCollection = database.collection("BestSells");
        const bannerCollection = database.collection("banner");
        const NewInCollection = database.collection("newin");
        const sareeCollection = database.collection('saree');
        // const cokerCollection = database.collection('coker');


        // coker
        // app.post("/coker", async (req, res) => {
        //     const name = req.body.name;
        //     const details = req.body.details;
        //     const price = req.body.price;
        //     const pic = req.files.img;
        //     const picData = pic.data;
        //     const encodedPic = picData.toString('base64');
        //     const imgBuffer = Buffer.from(encodedPic, 'base64');
        //     const coker = {
        //         name,
        //         details,
        //         price,
        //         img: imgBuffer
        //     }
        //     const result = await cokerCollection.insertOne(coker);


        //     res.json(result);
        //     console.log(result);

        // });


        // newin
        app.post("/newin", async (req, res) => {
            const name = req.body.name;
            const details = req.body.details;
            const price = req.body.price;
            const pic = req.files.img;
            const picData = pic.data;
            const encodedPic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodedPic, 'base64');
            const newin = {
                name,
                details,
                price,
                img: imgBuffer
            }
            const result = await NewInCollection.insertOne(newin);


            res.json(result);
        });

        app.get('/newin', async (req, res) => {
            const cursor = NewInCollection.find({})
            const newP = await cursor.toArray();
            res.json(newP);
        })

        app.get("/newin/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const NewInCollections = await NewInCollection.findOne(query)
            res.json(NewInCollections);
        });

        app.delete("/newin/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await NewInCollection.deleteOne(query);
            res.json(product);
        });



        // banner
        app.post("/banner", async (req, res) => {
            const pic = req.files.img;
            const picData = pic.data;
            const encodedPic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodedPic, 'base64');
            const banner = {
                img: imgBuffer
            }
            const result = await bannerCollection.insertOne(banner);


            res.json(result);
            console.log(result)

        });
        app.get('/banner', async (req, res) => {
            const cursor = bannerCollection.find({})
            const banner = await cursor.toArray();
            res.json(banner);
        })

        app.get("/banner/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const bannerCollections = await bannerCollection.findOne(query)
            res.json(bannerCollections);
        });

        app.delete("/banner/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await bannerCollection.deleteOne(query);
            res.json(product);
        });

        // saree

        app.post("/saree", async (req, res) => {
            const name = req.body.name;
            const details = req.body.details;
            const price = req.body.price;
            const pic = req.files.img;
            const picData = pic.data;
            const encodedPic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodedPic, 'base64');
            const saree = {
                name,
                details,
                price,
                img: imgBuffer
            }
            const result = await sareeCollection.insertOne(saree);


            res.json(result);

        });

        app.get('/saree', async (req, res) => {
            const cursor = sareeCollection.find({})
            const saree = await cursor.toArray();
            res.json(saree);
        })

        app.get("/saree/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const sareeCollection = await sareeCollection.findOne(query)
            res.json(sareeCollection);
        });

        app.delete("/saree/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await sareeCollection.deleteOne(query);
            res.json(product);
        });

        // bestSells
        app.post("/bestsells", async (req, res) => {
            const name = req.body.name;
            const details = req.body.details;
            const price = req.body.price;
            const pic = req.files.img;
            const picData = pic.data;
            const encodedPic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodedPic, 'base64');
            const kurti = {
                name,
                details,
                price,
                img: imgBuffer
            }
            const result = await bestSellsCollection.insertOne(kurti);


            res.json(result);
            // console.log(result)
        });

        app.get('/bestsells', async (req, res) => {
            const cursor = bestSellsCollection.find({})
            const bestSells = await cursor.toArray();
            res.json(bestSells);
        })

        app.get("/bestsells/:id", async (req, res) => {
            const id = req.params.id;

            const query = { _id: ObjectId(id) };
            const BestSellsProduct = await bestSellsCollection.findOne(query)
            res.json(BestSellsProduct);
        });

        app.delete("/bestsells/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await bestSellsCollection.deleteOne(query);
            res.json(product);
        });


        // kurti 

        app.get('/kurti', async (req, res) => {
            const cursor = KurtiCollection.find({})
            const kurti = await cursor.toArray();
            res.json(kurti);
        })

        app.get("/kurti/:id", async (req, res) => {
            const id = req.params.id;

            const query = { _id: ObjectId(id) };
            const kurtiProduct = await KurtiCollection.findOne(query)
            res.json(kurtiProduct);
        });

        app.delete("/kurti/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await KurtiCollection.deleteOne(query);
            res.json(product);
        });


        app.post("/kurti", async (req, res) => {
            const name = req.body.name;
            const details = req.body.details;
            const price = req.body.price;
            const pic = req.files.img;
            const picData = pic.data;
            const encodedPic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodedPic, 'base64');
            const kurti = {
                name,
                details,
                price,
                img: imgBuffer
            }
            const result = await KurtiCollection.insertOne(kurti);


            res.json(result);
        });


        // necklace
        app.post("/necklace", async (req, res) => {
            const name = req.body.name;
            const details = req.body.details;
            const price = req.body.price;
            const pic = req.files.img;
            const picData = pic.data;
            const encodedPic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodedPic, 'base64');
            const kurti = {
                name,
                details,
                price,
                img: imgBuffer
            }
            const result = await necklaceCollection.insertOne(kurti);


            res.json(result);
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
            const name = req.body.name;
            const details = req.body.details;
            const price = req.body.price;
            const pic = req.files.img;
            const picData = pic.data;
            const encodedPic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodedPic, 'base64');
            const kurti = {
                name,
                details,
                price,
                img: imgBuffer
            }
            const result = await jewellaryEarringCollection.insertOne(kurti);
            res.json(result);
        });

        app.get('/earring', async (req, res) => {
            const earRing = jewellaryEarringCollection.find({});
            const ring = await earRing.toArray();
            res.json(ring)
        });

        app.get("/earring/:id", async (req, res) => {
            const id = req.params.id;
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
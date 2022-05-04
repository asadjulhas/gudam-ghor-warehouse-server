const express = require('express');
const app = express();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 4000;
require('dotenv').config();


const { MongoClient, ServerApiVersion } = require('mongodb')
;


// Middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.GUDAM_GHOR_DB}:${process.env.GUDAM_GHOR_PASS}@cluster0.whv8p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

  try {
  await client.connect();

  const productCollenction = client.db('GudamGhor').collection('product');


  // Get all the products
 app.get('/product', async (req, res) => {
    const quary = {};
    const cursor = productCollenction.find(quary);
    const products = await cursor.toArray();
    res.send(products)
 })

 // Get a single item
 app.get('/item', async (req, res) => {
   const id = req.query.id;
   const query = {_id: ObjectId(id)};
   const item = await productCollenction.findOne(query)
   console.log(id)
   console.log(item)
   res.send('Hello')
 })


  }
  finally {
// await client.close()
  }

}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Gudam-Ghor server is running');
})

app.listen(port, () => {
 console.log('Gudam Ghor server is open on port', port)
})
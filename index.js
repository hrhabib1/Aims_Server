const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Simple node server running');
})

app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@cluster0.nwzqkqi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   const influencerCollection = client.db('features').collection('influencers');
   app.get('/influencers', async(req, res) => {
    const query = {};
    const cursor = influencerCollection.find(query);
    const influencers = await cursor.toArray();
    res.send(influencers);
   })

  } finally {
    
  }
}
run().catch(console.dir);


app.listen(port, () =>{
    console.log(`Simple node server running on port ${port}`);
})
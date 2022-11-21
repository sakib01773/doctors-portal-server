const express = require('express');
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express()

//midleware

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aebmoeb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function run() {
  try {
    const appointmentoptionCollection = client.db("doctorsPortal").collection("AppoinmentOption");

    app.get("/appoinmentOptions", async (req, res) => {
      const query = {};
      const options = await appointmentoptionCollection.find(query).toArray();
      res.send(options)
    })
      
    
  } finally {

  }
}
run().catch(err => console.log(err));

app.get('/', async(req, res) => {
  res.send('Doctors Portal is Running')
})

app.listen(port, () => {
  console.log(`Doctors Portal is listening on port ${port}`)
})
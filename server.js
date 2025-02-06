const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Connect to MongoDB Atlas
async function connectDB() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  return client.db('adlink').collection('links');
}

// Shorten URL
app.get('/shorten', async (req, res) => {
  const longUrl = req.query.url;
  if (!longUrl) return res.status(400).send('Missing URL');

  const links = await connectDB();
  const shortCode = Math.random().toString(36).substr(2, 6);

  await links.insertOne({
    shortCode,
    longUrl,
    createdAt: new Date()
  });

  res.json({ shortUrl: http://localhost:${port}/${shortCode} });
});

// Redirect with ads
app.get('/:shortCode', async (req, res) => {
  const links = await connectDB();
  const link = await links.findOne({ shortCode: req.params.shortCode });

  if (!link) return res.status(404).send('Link not found');
  res.redirect(/ad1.html?code=${req.params.shortCode});
});

// Serve static files (HTML/CSS/JS)
app.use(express.static('public'));

app.listen(port, () => {
  console.log(Server running on http://localhost:${port});
});
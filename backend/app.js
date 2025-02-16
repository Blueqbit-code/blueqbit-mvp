const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blueqbit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Shipper model
const Shipper = mongoose.model('Shipper', new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
}));

// Carrier model
const Carrier = mongoose.model('Carrier', new mongoose.Schema({
  name: String,
  type: String,
  capacity: Number,
}));

// Routes
app.post('/api/shippers', async (req, res) => {
  try {
    const shipper = new Shipper(req.body);
    await shipper.save();
    res.status(201).send(shipper);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/shippers', async (req, res) => {
  try {
    const shippers = await Shipper.find();
    res.status(200).send(shippers);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/carriers', async (req, res) => {
  try {
    const carrier = new Carrier(req.body);
    await carrier.save();
    res.status(201).send(carrier);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/carriers', async (req, res) => {
  try {
    const carriers = await Carrier.find();
    res.status(200).send(carriers);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

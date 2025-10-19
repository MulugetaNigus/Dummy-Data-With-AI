// app.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const aiEngine = require('./aiEngine');

app.get('/api/v1/generate', async (req, res) => {
  const { resource = 'user', count = '10', attributes = 'id,name,email,password,position,salary' } = req.query;
  const attrs = attributes.split(',');
  console.log(req.query)
  const num = parseInt(count, 10);

  try {
    console.log("Generating AI Response...");
    const aiResponse = await aiEngine(resource, num, attrs);
    res.json(aiResponse);
    console.log("AI Response generated successfully.");
  } catch (error) {
    console.error('Error generating AI content:', error);
    res.status(500).send('Error generating AI content.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
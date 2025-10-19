// app.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const aiEngine = require('./aiEngine');

app.get('/api/v1/generate', async (req, res) => {
  const { resource = 'user', count = '10', attributes = 'id,name,email,password,position,salary' } = req.query;
  // split attributes parameter into array
  const attrs = attributes.split(',');
  // log user queries
  console.log(req.query)
  // parse count parameter as integer
  const num = parseInt(count, 10);

  try {
    console.log("Generating AI Response...");
    // generate AI response
    const aiResponse = await aiEngine(resource, num, attrs);
    // send response as JSON
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
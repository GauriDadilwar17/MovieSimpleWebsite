const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors'); 

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());


const genAI = new GoogleGenerativeAI("gemini api");  
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    
    const result = await model.generateContent(userMessage);
    const botReply = result.response.text();

    res.json({ reply: botReply });
  } catch (error) {
    console.error('Error with Google Gemini API:', error);
    res.status(500).json({ reply: 'Sorry, something went wrong with the chatbot.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

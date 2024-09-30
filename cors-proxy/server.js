const express = require('express');
const axios = require('axios'); // Use axios instead of deprecated request
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

app.post('/api/caption_image', async (req, res) => {
    console.log('Received request body:', req.body); // Log the received body
    const url = 'https://api.imgflip.com/caption_image';
    
    try {
        // Send req.body as form-encoded parameters using axios
        const response = await axios.post(url, null, {
            params: req.body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        
        console.log('Response from Imgflip:', response.data); // Log the response from Imgflip
        res.send(response.data); // Send the response back to the client
    } catch (error) {
        console.error('Error in request:', error.response ? error.response.data : error.message); // Log the error details
        return res.status(error.response ? error.response.status : 500).send({ 
            message: "Internal Server Error", 
            error: error.response ? error.response.data : error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`CORS Proxy running on http://localhost:${PORT}`);
});

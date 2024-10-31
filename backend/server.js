const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { getWaterQualityData } = require('./mockData');
const { getBearerToken } = require('./aiWatsonModel'); 

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(cors());

const ENDPOINT_URL = ""; //Endpoint URL Hidden

app.get('/api/water-quality', (req, res) => {
    res.json(getWaterQualityData());
});

app.post('/predict', async (req, res) => {
    const { date, measure } = req.body;

    const payload = {
        input_data: [{
            fields: ["date", "measure"],
            values: [[date, measure]]
        }]
    };

    console.log("Payload being sent to IBM Watson:", payload);

    try {
        const bearerToken = await getBearerToken();
        const response = await axios.post(ENDPOINT_URL, payload, {
            headers: {
                "Authorization": `Bearer ${bearerToken}`,
                "Content-Type": "application/json"
            }
        });

        console.log("Response received from IBM Watson:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching prediction:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/feedback', (req, res) => {
    const { feedback, location, rating } = req.body;
    console.log("Received Feedback:", { feedback, location, rating });
    res.status(200).json({ message: 'Feedback received successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

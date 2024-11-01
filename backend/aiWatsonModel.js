const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const API_KEY = ""; //API Key hidden
const ENDPOINT_URL = ""; //Endpoint URL hidden

async function getBearerToken() {
    const iamUrl = "https://iam.cloud.ibm.com/identity/token";
    const response = await axios.post(iamUrl, null, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
            "apikey": API_KEY,
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
        },
    });
    return response.data.access_token;
}

// Prediction endpoint
app.post('/predict', async (req, res) => {
    const { basins_monitored, date, measure, n_basins, proportion } = req.body;
    const payload = {
        input_data: [{
            fields: ["basins_monitored", "date", "measure", "n_basins", "proportion"],
            values: [[basins_monitored, date, measure, n_basins, proportion]]
        }]
    };

    try {
        const bearerToken = await getBearerToken();
        const response = await axios.post(ENDPOINT_URL, payload, {
            headers: {
                "Authorization": `Bearer ${bearerToken}`,
                "Content-Type": "application/json"
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error getting prediction:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

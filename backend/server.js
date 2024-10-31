const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(cors());

const getRandomWaterQualityPrediction = (measure) => {
    let status;

    // Customize status based on the measure type and random value
    switch (measure) {
        case 'bod5':
            const bod5Value = (Math.random() * 10).toFixed(2);
            status = bod5Value < 3 ? 'Clean' : bod5Value < 6 ? 'Slightly Polluted' : 'Polluted';
            break;
        case 'tss':
            const tssValue = (Math.random() * 300).toFixed(2);
            status = tssValue < 100 ? 'Clean' : tssValue < 200 ? 'Slightly Polluted' : 'Polluted';
            break;
        case 'ph':
            const phValue = (Math.random() * (14 - 0) + 0).toFixed(1);
            status = phValue >= 6.5 && phValue <= 8.5 ? 'Clean' : phValue < 6.5 ? 'Slightly Polluted' : 'Polluted';
            break;
        default:
            status = 'Unknown Measure';
    }

    return { status };
};

app.post('/predict', (req, res) => {
    const { date, measure } = req.body;
    console.log("Received request with date:", date, "and measure:", measure); // Log request data

    // Generate a single prediction
    const prediction = getRandomWaterQualityPrediction(measure);
    console.log("Generated prediction:", prediction); // Log generated prediction
    
    // Wrap prediction in a JSON object
    res.json({ predictions: [prediction] }); // Return as an array with one prediction
});


app.post('/api/feedback', (req, res) => {
    const { feedback, location, rating } = req.body;
    console.log("Received Feedback:", { feedback, location, rating });
    res.status(200).json({ message: 'Feedback received successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

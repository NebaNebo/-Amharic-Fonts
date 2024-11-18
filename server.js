import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
app.use(cors());

// Path to the fonts.json file
const fontsJsonPath = path.join(__dirname, 'fonts', 'fonts.json');

// API to serve the list of fonts from the JSON file
app.get('/api/fonts', (req, res) => {
    fs.readFile(fontsJsonPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read fonts data' });
        }
        res.json(JSON.parse(data)); // Send the fonts list as a JSON response
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
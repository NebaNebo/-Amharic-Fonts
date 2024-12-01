import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
app.use(cors());

// Get the current file's directory
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the fonts folder
const fontsFolderPath = path.join(__dirname, 'fonts');

// API to serve the list of font files from the folder
app.get('/api/fonts', (req, res) => {
    fs.readdir(fontsFolderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read fonts directory' });
        }
        // Filter to include only font files (e.g., .ttf, .otf)
        const fontFiles = files.filter(file => file.endsWith('.ttf') || file.endsWith('.otf'));
        res.json({ fonts: fontFiles });
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
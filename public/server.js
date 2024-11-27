import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'; // File system module

// Resolve __dirname in ES modules
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Define the fonts directory
const fontsDir = path.join(__dirname, 'public', 'fonts');
console.log("Fonts directory path:", fontsDir);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API to list all font files in JSON format
app.get('/api/fonts', (req, res) => {
    fs.readdir(fontsDir, (err, files) => {
        if (err) {
            console.error("Error reading fonts directory:", err.message);
            return res.status(500).json({ error: 'Unable to read fonts data' });
        }

        // Filter font files (e.g., .ttf, .otf) and generate JSON response
        const fonts = files.filter(file => /\.(ttf|otf|woff|woff2)$/i.test(file));
        res.json({ fonts }); // Wrap the array of fonts in an object with the key "fonts"
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
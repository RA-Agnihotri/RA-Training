const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/api/process', upload.single('file'), async (req, res) => {
    const command = req.body.command;
    const file = req.file;

    let fileContent = '';
    if (file) {
        fileContent = fs.readFileSync(file.path, 'utf-8');
        fs.unlinkSync(file.path);
    }

    try {
        const apiResponse = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `sk-proj-ql5ozijCBI68ftW14YLaT3BlbkFJqRCsYkXNn9REjm8UUnJh`
            },
            body: JSON.stringify({
                prompt: command + '\n\n' + fileContent,
                max_tokens: 150
            })
        });
        const apiData = await apiResponse.json();
        const responseText = apiData.choices[0].text;

        res.json({ response: responseText });
    } catch (error) {
        res.status(500).json({ error: 'Error processing request' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

document.getElementById('promptForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const prompt = document.getElementById('prompt').value;
    const outputDiv = document.getElementById('output');
    const downloadButton = document.getElementById('downloadButton');

    outputDiv.textContent = 'Loading...';

    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sk-proj-ql5ozijCBI68ftW14YLaT3BlbkFJqRCsYkXNn9REjm8UUnJh' // Replace with your actual API key
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 150
        })
    });

    const data = await response.json();
    const output = data.choices[0].text.trim();
    outputDiv.textContent = output;

    downloadButton.onclick = function () {
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.txt';
        a.click();
        URL.revokeObjectURL(url);
    };
});

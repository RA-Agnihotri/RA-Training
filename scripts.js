document.getElementById('submit-btn').addEventListener('click', async () => {
    const command = document.getElementById('command-input').value;
    const fileInput = document.getElementById('file-input');
    const outputElement = document.getElementById('output');
    const downloadBtn = document.getElementById('download-btn');

    let formData = new FormData();
    formData.append('command', command);

    if (fileInput.files.length > 0) {
        formData.append('file', fileInput.files[0]);
    }

    try {
        const response = await fetch('/api/process', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        outputElement.textContent = data.response;

        const blob = new Blob([data.response], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        downloadBtn.href = url;
        downloadBtn.download = 'output.txt';
        downloadBtn.style.display = 'inline-block';
    } catch (error) {
        outputElement.textContent = 'Error processing request';
    }
});

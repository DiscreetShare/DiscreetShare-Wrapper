const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

class DiscreetShare {
  constructor(apiBaseUrl = 'https://api.discreetshare.com') {
    this.apiBaseUrl = apiBaseUrl;
  }

  async upload(filePath) {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    try {
      const response = await fetch(`${this.apiBaseUrl}/upload`, {
        method: 'POST',
        body: formData,
        // Add any necessary headers for the request
      });
      return response.json();
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  async download(fileId, outputPath) {
    const response = await fetch(`${this.apiBaseUrl}/download/${fileId}`);
    if (!response.ok) throw new Error('Download failed');

    const fileStream = fs.createWriteStream(outputPath);
    return new Promise((resolve, reject) => {
      response.body.pipe(fileStream);
      response.body.on('error', reject);
      fileStream.on('finish', resolve);
    });
  }

  async streamImage(fileId) {
    // This method assumes you want to return the response directly to the client
    const response = await fetch(`${this.apiBaseUrl}/cdn/${fileId}`);
    if (!response.ok) throw new Error('Image streaming failed');
    return response;
  }
}

module.exports = DiscreetShare;

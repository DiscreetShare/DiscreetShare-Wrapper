const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to make HTTP GET requests
function httpGet(options) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Function to upload a file
function uploadFile(filePath) {
  const options = {
    hostname: 'localhost', // Change this to the appropriate hostname
    port: 1828,
    path: '/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const req = http.request(options, (res) => {
    console.log(`Upload Response: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`Response Data: ${chunk}`);
    });
  });

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(req);

  req.on('error', (error) => {
    console.error(`Error uploading file: ${error.message}`);
  });

  req.end();
}

// Function to download a file
function downloadFile(fileId) {
  const options = {
    hostname: 'localhost', // Change this to the appropriate hostname
    port: 1828,
    path: `/download/${fileId}`,
    method: 'GET',
  };

  const req = http.request(options, (res) => {
    console.log(`Download Response: ${res.statusCode}`);
    const fileStream = fs.createWriteStream(`downloaded_${fileId}.txt`);

    res.pipe(fileStream);

    fileStream.on('finish', () => {
      console.log(`File downloaded successfully`);
    });
  });

  req.on('error', (error) => {
    console.error(`Error downloading file: ${error.message}`);
  });

  req.end();
}

// Function to get file information
async function getFileInfo(fileId) {
  const options = {
    hostname: 'localhost', // Change this to the appropriate hostname
    port: 1828,
    path: `/info/${fileId}`,
    method: 'GET',
  };

  try {
    const response = await httpGet(options);

    if (response.data && response.data.fileInfo) {
      return response.data.fileInfo;
    } else {
      console.error('Error retrieving file information:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error retrieving file information:', error);
    return null;
  }
}

module.exports = {
  uploadFile,
  downloadFile,
  getFileInfo,
};

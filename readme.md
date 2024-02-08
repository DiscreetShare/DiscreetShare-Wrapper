# DiscreetShare Wrapper

This is a Node.js wrapper for the DiscreetShare API, designed to simplify the process of uploading, downloading, and streaming files through DiscreetShare's services. With minimal setup, you can integrate DiscreetShare's functionalities into your Node.js applications.

## Features

- Easy-to-use methods for interacting with the DiscreetShare API.
- Supports file uploads, downloads, and streaming.
- Implements promise-based asynchronous requests.

## Installation

Install the package using npm:

```bash
npm install discreetshare-wrapper
```

Or using yarn:

```bash
yarn add discreetshare-wrapper
```

## Usage

First, require the package in your project:

```javascript
const DiscreetShare = require('discreetshare-wrapper');
```

### Initializing

Create an instance of the DiscreetShare wrapper:

```javascript
const discreetShare = new DiscreetShare();
```

### Uploading a File

```javascript
discreetShare.upload('/path/to/your/file.jpg')
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

### Downloading a File

```javascript
discreetShare.download('fileId', '/path/to/save/file.jpg')
  .then(() => console.log('Download successful'))
  .catch(error => console.error(error));
```

### Streaming an Image

For streaming an image, you might want to integrate this method into your web server's routing. Here's an example using Express:

```javascript
const express = require('express');
const app = express();

app.get('/stream-image/:fileId', (req, res) => {
  discreetShare.streamImage(req.params.fileId)
    .then(streamResponse => streamResponse.body.pipe(res))
    .catch(error => {
      console.error(error);
      res.status(500).send('Failed to stream image');
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## API Reference

For a detailed API reference and additional configurations, please refer to the DiscreetShare official documentation at `https://docs.discreetshare.com`.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/DiscreetShare/DiscreetShare-Wrapper/issues).
## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Nathan Laviolette - Discord : growtoups

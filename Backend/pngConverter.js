const sharp = require('sharp');
sharp(filePath)
  .png()
  .toFile(`./uploads/image${i}.png`, (err, info) => {
    if (err) {
      console.error('Error converting file to PNG:', err);
    } else {
      console.log('File converted to PNG:', info);
    }
  });
//config multer
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination directory for uploads (e.g., 'uploads/')
        console.log("middleware");
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        console.log("middleware");
        // Use the original filename provided by the user
        cb(null, file.originalname);
    }
});
module.exports = multer({ storage });
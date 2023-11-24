// Ensure multer configuration is correct
const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();
const maxSize = 100 * 1024;

const upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize,
    },
    // Remove this part from your Multer configuration
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    fileFilter: function (req, file, cb) {
        console.log('File Type:', file.mimetype);

        // Check if content-length header is present in the request
        if (req.headers['content-length']) {
            const fileSize = parseInt(req.headers['content-length']);

            console.log('File Size:', fileSize);

            // Check if file size is less than or equal to maxSize
            if (fileSize <= maxSize) {
                // Save the original file without resizing
                cb(null, true);
            } else {
                console.log('File size exceeds the maximum allowed size. Resizing...');

                // Resize the image if it exceeds the maximum size
                if (file.buffer && file.buffer.length > 0) {
                    console.log('Before resizing - Buffer Length:', file.buffer.length);
                    sharp(file.buffer)
                        .resize({ width: 100, height: 100 }) // Adjust the dimensions as needed
                        .toBuffer()
                        .then((resizedBuffer) => {
                            file.buffer = resizedBuffer;
                            console.log('After resizing - Buffer Length:', file.buffer.length);
                            cb(null, true);
                        })
                        .catch((error) => {
                            console.error('Error resizing image:', error);
                            cb(new Error('Error processing image'), false);
                        });
                } else {
                    console.error('Invalid input for resizing');
                    console.log('Buffer Length:', file.buffer ? file.buffer.length : 'undefined');
                    cb(new Error('Invalid input for resizing'), false);
                }
            }
        } else {
            console.error('Content-length header is missing');
            const error = new Error('Content-length header is missing');
            error.status = 400; // Bad Request
            cb(error, false);
        }
    },

}).single('image');

// Export the upload middleware
module.exports = {
    upload,
};
const multer = require('multer');
const path = require('path');
// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    console.log('multer', file);
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      cb(new Error('Unsupported file type!'), false);
      return;
    }
    cb(null, true);
  },
});

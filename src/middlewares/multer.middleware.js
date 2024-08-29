const multer = require('multer')
const fs = require('fs')
const path = require('path')
/**
 * Set storage engine for multer
 * And create the Destination folder for uploaded files
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var folder = './public/uploads/'

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true })
    }

    cb(null, folder)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

// Initialize multer
const upload = multer({
  storage: storage
})

module.exports = upload

const multer = require("multer");
const path = require("path");

// Destination and name that will be used
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

//limit file types
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported File Type"), false);
  }
};

// Upload standards and location
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
  fileFilter: fileFilter,
});

module.exports = {
  upload: upload,
};

const upload = (req, res) => {
  if (req.file.filename) {
    res.status(201).json({
      message: "image uploaded successfully",
      url: req.file.filename,
    });
  } else {
    res.status(500).json({
      message: "unsuccessful image upload",
    });
  }
};

module.exports = {
  upload: upload,
};

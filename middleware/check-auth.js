const jwt = require("jsonwebtoken");

// Check authentication using webtoken
const checkAuth = (req, res, next) => {
  //Verify the token
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decodedToken;
    next();
    //Invalid token
  } catch (e) {
    return res.status(401).json({
      message: "Invalid or Expired Token",
      error: e,
    });
  }
};

module.exports = {
  checkAuth: checkAuth,
};

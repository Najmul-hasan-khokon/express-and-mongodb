const jwt = require("jsonwebtoken");

const checkLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const { username, userId } = decoded;
    // jate ami sokol route e user er username and id ta pai tai req object e dukaici.
    req.username = username;
    req.userId = userId;
    next();
  } catch (err) {
    next("Authentication failed");
  }
};

module.exports = checkLogin;

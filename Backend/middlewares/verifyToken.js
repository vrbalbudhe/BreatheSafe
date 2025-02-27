const jwt = require("jsonwebtoken");

const checkLoginApi = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    if (!process.env.JWT_SECRET_KEY) {
      console.error("JWT_SECRET_KEY is not set in environment variables.");
      return res.status(500).json({ message: "Server Error", success: false });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = payload.userId;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
  } catch (error) {
    console.error("Error in checkLoginApi:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

module.exports = { checkLoginApi };

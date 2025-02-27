const prisma = require("../../lib/prisma");
const jwt = require("jsonwebtoken");

const checkLoginApi = async (req, res) => {
  const token =
    req.cookies?.token ||
    req.cookies?.cotoken ||
    req.headers.authorization?.split(" ")[1];

  console.log("token ->", token);
  try {
    if (!token) {
      return res.status(401).json({
        message: "User is not authenticated",
        success: false,
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = payload.userId;
    console.log("payload - > ", payload);

    return res.status(200).json({
      message: "User Info Fetched Successfully! || User is Logged In",
      payload,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid or Expired Token",
      success: false,
    });
  }
};

module.exports = { checkLoginApi };

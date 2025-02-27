const cookieParser = require("cookie-parser");
const prisma = require("../../lib/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({
        message: "All fields are Required!",
        success: false,
      });
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!existingUser) {
      res.status(400).json({
        message: `No Account Found, with this Email ${email}`,
        success: false,
      });
    }
    const comparePassword = bcrypt.compareSync(password, existingUser.password)
      ? true
      : false;
    if (!comparePassword) {
      res.status(500).json({
        message: "Password Does Not Matched",
        success: false,
      });
    }

    const tokenData = {
      userId: existingUser.id,
      email: existingUser.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    return res.status(200).json({
      message: `Welcome back, ${email}! Login successful.`,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to Execute the User Login",
      success: false,
    });
    console.log(error);
  }
};

module.exports = { userLogin };

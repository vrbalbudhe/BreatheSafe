const cookieParser = require("cookie-parser");
const prisma = require("../../lib/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ParcelCompanyLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const parcelUser = await prisma.parcelCompany.findUnique({
      where: {
        email: email,
      },
    });

    if (!parcelUser) {
      return res.status(400).json({
        message: `No account found with this email: ${email}`,
        success: false,
      });
    }

    const comparePassword = bcrypt.compareSync(password, parcelUser.password);
    if (!comparePassword) {
      return res.status(500).json({
        message: "Password does not match",
        success: false,
      });
    }

    const tokenData = {
      userId: parcelUser.id,
      email: parcelUser.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("cotoken", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    return res.status(200).json({
      message: `Welcome back, ${email}! Parcel company login successful.`,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to execute parcel company login",
      success: false,
    });
    console.log(error);
  }
};

module.exports = ParcelCompanyLogin;

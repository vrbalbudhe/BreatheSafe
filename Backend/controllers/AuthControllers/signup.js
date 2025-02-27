const prisma = require("../../lib/prisma");
const bcrypt = require("bcrypt");

const userRegistration = async (req, res) => {
  const { firstName, lastName, email, phone, password, gender } = req.body;
  try {
    if (!firstName || !lastName || !phone || !email || !password) {
      return res.status(400).json({
        message: "All fields are Required!",
        success: false,
      });
    }

    const findUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (findUser) {
      return res.status(400).json({
        message: `Dear, ${firstName} ${lastName} Your Account Already Exists!`,
        success: false,
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
        gender,
      },
    });

    if (!newUser) {
      return res.status(400).json({
        message: "Unable to Create the New User",
        success: false,
      });
    }

    return res.status(200).json({
      message: `Dear, ${firstName} ${lastName} Your Account Created Successfully On SpeedoParcel!`,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to Execute the User Registration",
      success: false,
    });
  }
};

module.exports = {
  userRegistration,
};

const prisma = require("../../lib/prisma");

const UserAllInfo = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({
        message: "All fields are Required!",
        success: false,
      });
    }

    const userDetails = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!userDetails) {
      return res.status(400).json({
        message: `Unable to Fetch The User, with this Email ${email}`,
        success: false,
      });
    }

    return res.status(200).json({
      message: `User Information Fetched Successfully.`,
      success: true,
      userInfo: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to Fetch The User All Information",
      success: false,
    });
  }
};

module.exports = { UserAllInfo };

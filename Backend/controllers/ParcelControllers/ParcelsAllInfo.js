const prisma = require("../../lib/prisma");

const ParcelsAllInfo = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    if (!email) {
      res.status(400).json({
        message: "All fields are Required!",
        success: false,
      });
    }
    const ParcelCoDetails = await prisma.parcelCompany.findUnique({
      where: {
        email: email,
      },
    });
    if (!ParcelCoDetails) {
      res.status(400).json({
        message: `Unable to Fetch The Parcel Company User, with this Email ${email}`,
        success: false,
      });
    }
    return res.status(200).json({
      message: `Parcel Company Information Fetched Successful.`,
      success: true,
      userInfo: ParcelCoDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to Fetch The Parcel Company All Information",
      success: false,
    });
  }
};
module.exports = { ParcelsAllInfo };

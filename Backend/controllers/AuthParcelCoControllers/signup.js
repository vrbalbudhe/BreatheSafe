const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const ParcelCompanyRegistration = async (req, res) => {
  try {
    const { email, name, phone, address, state, pincode, password } = req.body;

    const existingCompany = await prisma.parcelCompany.findUnique({
      where: { email },
    });

    if (existingCompany) {
      return res.status(400).json({
        message: "Parcel Company already exists",
        success: false,
      });
    }

    // Create Parcel Company
    const hashedPass = bcrypt.hashSync(password, 10);
    const newCompany = await prisma.parcelCompany.create({
      data: {
        email,
        name,
        phone,
        address,
        state,
        pincode,
        password: hashedPass,
      },
    });

    res.status(201).json({
      message: "Parcel Company registered successfully",
      success: true,
      data: newCompany,
    });
  } catch (error) {
    console.error("Error in ParcelCompanyRegistration:", error);
    res.status(500).json({
      message: "Unable to Make A Parcel Company Registration",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { ParcelCompanyRegistration };

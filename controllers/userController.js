const userModel = require("../models/userModel");
const customerModel = require("../models/customerModel");
const supplierModel = require("../models/supplierModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.secret;
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userid: user._id, email: user.email, role: user.role },
      secret
    );

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (name.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters long",
      });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
      verificationToken,
      verificationTokenExpiresAt,
      isVerified: false,
    });

    await newUser.save();

    try {
      await sendVerificationEmail(email, verificationToken);

      res.status(201).json({
        success: true,
        message:
          "Registration successful. Please check your email for verification.",
        user: {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (emailError) {
      await userModel.findByIdAndDelete(newUser._id);
      console.error("Email sending error:", emailError);
      return res.status(500).json({
        success: false,
        message: "Failed to send verification email. Please try again.",
      });
    }
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

async function totalcustomer(req, res) {
  try {
     const user = req.user.userid;

    // Get the customer IDs
    const newUser = await userModel
      .findOne({ _id: user })
      .select({ customers: 1 });
    const customerIds = newUser.customers;
    console.log("customerIds :",customerIds)

    // Fetch all customer details and sort by updatedAt descending
    const customerList = await customerModel
      .find({ _id: { $in: customerIds } })
      .sort({ updatedAt: -1 });

    res.status(201).json({
      success: true,
      customerList,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Bad Request" });
  }
}


// async function totalsupplier(req, res) {
//   try {
//     const user = req.user.userid;
//     const newUser = await userModel
//       .find({ _id: user })
//       .select({ suppliers: 1 });
//     console.log(newUser);
//     const supplierList = [];
//     for (const supplier of newUser[0].suppliers) {
//       console.log(supplier);
//       const supplierDetail = await supplierModel.find({ _id: supplier });
//       supplierList.push({ ...supplierDetail });
//     }
//     res.status(201).json({
//       success: true,
//       supplierList,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ success: false, error: "Bad Request" });
//   }
// }

async function totalsupplier(req, res) {
  try {
     const user = req.user.userid;

    // Get the customer IDs
    const newUser = await userModel
      .findOne({ _id: user })
      .select({ suppliers: 1 });
    const supplierIds = newUser.suppliers;
    console.log("supplierIds :",supplierIds)

    // Fetch all customer details and sort by updatedAt descending
    const supplierList = await supplierModel
      .find({ _id: { $in: supplierIds } })
      .sort({ updatedAt: -1 });

    res.status(201).json({
      success: true,
      supplierList,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Bad Request" });
  }
}

const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Verification code is required",
      });
    }

    const user = await userModel.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Email verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  totalcustomer,
  totalsupplier,
  verifyEmail
};

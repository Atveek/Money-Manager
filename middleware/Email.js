const { transporter } = require("./email.config");
const {
  Verification_Email_Template,
  Welcome_Email_Template,
} = require("./EmailTemplete");
require("dotenv").config();

const sendVerificationEmail = async (email, verificationCode) => {
  try {
    if (!email || !verificationCode) {
      console.error("Missing email or verification code");
      throw new Error("Email and verification code are required");
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your Email",
      text: "Please verify your email address",
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ),
    };

    const response = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });
    throw new Error("Failed to send verification email");
  }
};

const sendWelcomeEmail = async (email, name) => {
  try {
    if (!email || !name) {
      console.error("Missing email or name");
      throw new Error("Email and name are required");
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome to Money Manager",
      text: `Welcome ${name}!`,
      html: Welcome_Email_Template.replace("{name}", name),
    };

    const response = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });
    throw new Error("Failed to send welcome email");
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
};

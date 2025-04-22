const { transporter } = require("./email.config");
require("dotenv").config();

const Verification_Email_Template = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .code { 
            font-size: 32px; 
            font-weight: bold; 
            color: #2c3e50; 
            text-align: center;
            padding: 20px;
            margin: 20px 0;
            background: #f7f9fc;
            border-radius: 8px;
            letter-spacing: 2px;
        }
        .instructions {
            color: #666;
            line-height: 1.6;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2 style="color: #2c3e50; text-align: center;">Verify Your Email</h2>
        <p class="instructions">Thank you for registering with Money Manager. Please use the following verification code to complete your registration:</p>
        <div class="code">{verificationCode}</div>
        <p style="color: #e74c3c; font-size: 14px;">This code will expire in 24 hours.</p>
        <p style="color: #666; font-size: 14px;">If you didn't request this verification code, please ignore this email.</p>
    </div>
</body>
</html>
`;

const Welcome_Email_Template = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Welcome to Money Manager!</h2>
        <p>Hello {name},</p>
        <p>Thank you for joining Money Manager. We're excited to help you manage your finances effectively.</p>
        <p>Get started by exploring our features and setting up your financial goals.</p>
    </div>
</body>
</html>
`;

const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your Money Manager Account",
      text: `Your verification code is: ${verificationCode}`,
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ),
    });

    return true;
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw error;
  }
};

const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome to Money Manager",
      text: `Welcome ${name}!`,
      html: Welcome_Email_Template.replace("{name}", name),
    });
    return true;
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
  Verification_Email_Template,
  Welcome_Email_Template,
};

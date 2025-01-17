import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendMail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: "VERIFY" | "FORGOT";
  userId: string;
}) => {
  try {
    // Generate a hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // Update user record based on emailType
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 10 * 60 * 1000, // 10 minutes
      });
    } else if (emailType === "FORGOT") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 10 * 60 * 1000, // 10 minutes
      });
    }

    // Create email transport configuration
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c9fed31bdeb2ad", // Replace with your Mailtrap user
        pass: "9efb3b2250db01", // Replace with your Mailtrap password
      },
    });

    // Email content based on emailType
    const mailOptions = {
      from: "kharlsuzan456@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      // Replace with the actual URL
      html: `<p>
  click <a href="${
    process.env.DOMAIN
  }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
  or copy and paste the link below in your browser
  .<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
  </p>`,
    };
    const mailresponse = await transporter.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};

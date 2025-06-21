import nodemailer from "nodemailer";

/**
 * Sends an email using Gmail SMTP via Nodemailer
 * @param {string} to - Recipient email address
 * @param {string} subject - Subject of the email
 * @param {string} text - Plain text content of the email
 * @param {string} html - (Optional) HTML content of the email
 */
async function sendEmail({ to, subject, text, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-app-password", // Use Gmail App Password here
      },
    });

    const info = await transporter.sendMail({
      from: '"Your Name" <your-email@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

module.exports = sendEmail;

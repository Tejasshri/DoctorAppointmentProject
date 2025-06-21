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
        user: "tejasshrishekhar08@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD, // Use Gmail App Password here
      },
    });

    console.log(to, subject, text, html);

    const info = await transporter.sendMail({
      from: '"drPsych" tejasshrishekhar08@gmail.com',
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error(error?.message);
  }
}

export default sendEmail;

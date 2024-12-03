const nodemailer = require("nodemailer");

exports.sendEmailNotification = async ({ email, subject, message }) => {
  if (!email || !subject || !message) {
    throw new Error("Email, subject, and message are required to send a notification.");
  }

  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Specify the email provider
      auth: {
        user: "risvarrtcanada@gmail.com", // Replace with your Gmail address
        pass: "puat knhq srsd yucl", // Replace with your provided app password
      },
    });

    // Email options
    const mailOptions = {
      from: "risvarrtcanada@gmail.com", // Sender email
      to: email, // Recipient email
      subject, // Email subject
      text: message, // Email content (plain text)
    };

    // Send the email
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
    throw error;
  }
};

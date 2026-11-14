import nodemailer from "nodemailer";

export const sendHelpEmail = async (req, res) => {
    try {
        const { subject, message } = req.body;

        if (!subject || !message) {
            return res.status(400).json({
                message: "Subject and message are required"
            });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `GameShelf Support: ${subject}`,
            text: message
        });

        res.status(200).json({
            message: "Email sent successfully"
        });

    } catch (error) {
        console.error("Email error:", error);

        res.status(500).json({
            message: "Failed to send email"
        });
    }
};
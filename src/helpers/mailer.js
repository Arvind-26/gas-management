import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import { uuid } from 'uuidv4';

export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        const uuidToken = uuid()
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: uuidToken, verifyTokenExpiry: Date.now() + 1800000 }
            )
        } else if (emailType === "FORGOT") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: uuidToken, forgotPasswordTokenExpiry: Date.now() + 1800000 }
            )
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "4978ce167ba365",
                pass: "17f06d351dfefb"
            }
        });

        const mailOptions = {
            from: 'arvind@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your account" : "Reset your password",
            text: "Hello world?",
            html: `<p><br> <a href="${process.env.DOMAIN}/verifyemail?token=${uuidToken}"><button>Click Here</button></a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}<br> Or Copy paste this link in your browser ${process.env.DOMAIN}/verifyemail?token=${uuidToken}</p>`,
        }

        const info = await transport.sendMail(mailOptions)

        return info

    } catch (error) {
        throw new Error(error.message)
    }
}
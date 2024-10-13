import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import { v1 as uuidv1 } from 'uuid';

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const uuidToken = uuidv1();
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
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
      }
    });

    const mailOptions = {
      to: email,
      subject: emailType === 'VERIFY' ? "Verify your account" : "Reset your password",
      text: "Mail",
      html: `<!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }

    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }

  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }

  img {
    -ms-interpolation-mode: bicubic;
  }

  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }

  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }

  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  table {
    border-collapse: collapse !important;
  }

  a {
    color: #1a82e2;
  }

  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">

  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="${process.env.DOMAIN}" target="_blank" style="display: inline-block;">
                <img src="${process.env.DOMAIN}/_next/image?url=%2Flogo.png&w=128&q=75" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">${emailType === 'VERIFY' ? "Confirm Your Email Address" : "Reset your password"}</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">${emailType === 'VERIFY' ? `Tap the button below to confirm your email address. If you didn't create an account with <a href='${process.env.DOMAIN}'>E Gas</a>, you can safely delete this email.` : `Tap the button below to reset your password. If you didn't create an account with <a href='${process.env.DOMAIN}'>E Gas</a>, you can safely delete this email.`}</p>
            </td>
          </tr>

          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                          <a href="${emailType === 'VERIFY' ? `${process.env.DOMAIN}/verifyemail?token=${uuidToken}` : `${process.env.DOMAIN}/setpassword?token=${uuidToken}`}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">${emailType === 'VERIFY' ? "Confirm Your Email Address" : "Reset your password"}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
              <p style="margin: 0;"><a href="${emailType === 'VERIFY' ? `${process.env.DOMAIN}/verifyemail?token=${uuidToken}` : `${process.env.DOMAIN}/setpassword?token=${uuidToken}`}" target="_blank">${emailType === 'VERIFY' ? `${process.env.DOMAIN}/verifyemail?token=${uuidToken}` : `${process.env.DOMAIN}/setpassword?token=${uuidToken}`}</a></p>
            </td>
          </tr>

          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
              <p style="margin: 0;">Thanks,<br> E Gas</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">You received this email because we received a request for ${emailType === 'VERIFY' ? "verify your email" : "reset your password"} for your account. If you didn't request ${emailType === 'VERIFY' ? "verify your email" : "reset your password"} you can safely delete this email.</p>
            </td>
          </tr>

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">To stop receiving these emails, you can <a href="${process.env.DOMAIN}" target="_blank">unsubscribe</a> at any time.</p>
              <p style="margin: 0;">street 123, Pune, Maharastra</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>

  </table>

</body>
</html>`,
    }

    const info = await transport.sendMail(mailOptions)

    return info

  } catch (error) {
    throw new Error(error.message)
  }
}
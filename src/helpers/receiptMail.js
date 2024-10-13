import nodemailer from 'nodemailer'

export const sendEmailForPaymentSuccess = async ({ email, emailType, quantity, customerName, size, amount, paymentDate, orderId }) => {

    try {
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
            subject: emailType === "NEW" ? "Welcome to E Gas" : "Payment Success",
            text: "Hello world?",
            html: emailType === "NEW" ? `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #4CAF50;
        }
        p {
            line-height: 1.6;
        }
        .order-details {
            margin-top: 20px;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 8px;
        }
        .order-details h2 {
            margin: 0;
            color: #333;
        }
        .order-details table {
            width: 100%;
            border-collapse: collapse;
        }
        .order-details table th,
        .order-details table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        .order-details table th {
            background-color: #f1f1f1;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #888;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Thank You for Your Purchase, ${customerName}!</h1>
        <p>We are excited to have you as our new customer. Below are the details of your recent purchase:</p>

        <div class="order-details">
            <h2>Order Details</h2>
            <table>
                <tr>
                    <th>Order ID</th>
                    <td>${orderId}</td>
                </tr>
                <tr>
                    <th>Date</th>
                    <td>${paymentDate}</td>
                </tr>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>${size}</td>
                    <td>${quantity}</td>
                    <td>${amount}</td>
                    <td>${quantity}</td>
                </tr>
            </table>
            <h2>Total Amount: ${amount}</h2>
        </div>

        <p>If you have any questions, feel free to <a href="mailto:arvind@gmail.com">contact us</a>.</p>

        <div class="footer">
            <p>Best regards,</p>
            <p><strong>E Gas</strong></p>
            <p>Email: <a href="mailto:arvind@gmail.com">arvind@gmail.com</a> | Phone: +91 9988776655</p>
        </div>
    </div>
</body>
</html>
`
                :
                `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #4CAF50;
        }
        p {
            line-height: 1.6;
        }
        .booking-details {
            margin-top: 20px;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 8px;
        }
        .booking-details h2 {
            margin: 0;
            color: #333;
        }
        .booking-details table {
            width: 100%;
            border-collapse: collapse;
        }
        .booking-details table th,
        .booking-details table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        .booking-details table th {
            background-color: #f1f1f1;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #888;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Your Booking Confirmation, ${customerName}!</h1>
        <p>We are glad to have you back! Below are the details of your recent booking:</p>

        <div class="booking-details">
            <h2>Booking Details</h2>
            <table>
                <tr>
                    <th>Booking ID</th>
                    <td>${orderId}</td>
                </tr>
                <tr>
                    <th>Date</th>
                    <td>${paymentDate}</td>
                </tr>
                <tr>
                    <th>Service</th>
                    <td>Booking</td>
                </tr>
                <tr>
                    <th>Amount</th>
                    <td>${amount}</td>
                </tr>
            </table>
            <h2>Total Amount Paid: ${amount}</h2>
        </div>

        <p>If you have any questions regarding your booking, feel free to <a href="mailto:arvind@gmail.com">contact us</a>.</p>

        <div class="footer">
            <p>Best regards,</p>
            <p><strong>E Gas</strong></p>
            <p>Email: <a href="mailto:arvind@gmail.com">arvind@gmail.com</a> | Phone: +91 9988776655</p>
        </div>
    </div>
</body>
</html>
`,
        }
        const info = await transport.sendMail(mailOptions)
        return info

    } catch (error) {
        throw new Error(error.message);
    }
}
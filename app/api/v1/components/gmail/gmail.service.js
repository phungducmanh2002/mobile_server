const { text } = require("express");
const nodemailer = require("nodemailer");

const createHtmlActivationCodePage = (code) => {
  const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Activation Email</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
          }
          p {
            color: #666666;
            line-height: 1.6;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }
          .btn:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Kích hoạt tài khoản của bạn</h1>
          <p>
            Bạn vừa đăng kí tài khoản tại trang web
            <a href="">khachsanlangim.com</a>
          </p>
          <h5>Mã kích hoạt tài khoản của bạn là: ${code}</h5>
        </div>
      </body>
    </html>
    `;
  return html;
};

class GmailService {
  static transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "kimyoki99@gmail.com",
      pass: "hhfq jkix whva rbvr",
    },
  });
  static async SendActivationCode(email, code) {
    const html = createHtmlActivationCodePage(code);
    let mailOptions = {
      from: "kimyoki99@gmail.com",
      to: email,
      subject: "KTX kích hoạt tài khoản",
      html: html,
    };
    try {
      const info = await GmailService.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      return null;
    }
  }
}

module.exports = GmailService;

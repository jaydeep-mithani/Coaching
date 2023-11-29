const verifyUserTemplate = ({ verificationLink }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f2effb;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
      }
      h1 {
        color: #671d63;
        font-size: 24px;
        margin: 0;
      }
      .content {
        padding: 20px;
      }
      p {
        font-size: 16px;
        color: #333;
        line-height: 1.5;
      }
      .button-container {
        text-align: center;
        margin-top: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #671d63;
        color: white !important;
        text-decoration: none;
        border-radius: 8px;
        transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
      }
      .button:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      }
      .link {
        font-size: 16px;
        color: #671d63;
        word-break: break-all;
        text-align: center;
        margin-top: 20px;
      }
      .mail{
        text-decoration: none;
        color: black;
        font-size: 16px;
        text-align: center;
      }
      .mail-link {
        color: #671d63;
        padding-left: 6px;
        font-weight: 700;
        color: #671d63 !important;
        text-decoration: none !important;
      }
    </style>
  </head>
  <body>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="container">
            <tr>
              <td class="header">
                <h1>Verify Your Account</h1>
              </td>
            </tr>
            <tr>
              <td class="content">
                <p>
                  Thank you for creating an account. To activate your account, please click the button below:
                </p>
                <div class="button-container">
                  <a href="${verificationLink}" class="button">Verify Account</a>
                </div>
                <p class="mail">If you have any questions, please email us at
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=support@becomeyourcreator.com" class="mail-link">
                support@becomeyourcreator.com
              </a>
            </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

module.exports = verifyUserTemplate;

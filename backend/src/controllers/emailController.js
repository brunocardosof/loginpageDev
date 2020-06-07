const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const { authSecret } = require('../../.authSecret')

module.exports = {
    async send(req, res) {
        const { destinatario } = req.body
        const link = jwt.sign(destinatario, authSecret)

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                // should be replaced with real sender's account
                user: "loginpageproject2020@gmail.com",
                pass: "Loginpageproject2020*"
            }
        });

        let mailOptions = {
            // should be replaced with real recipient's account
            bcc: destinatario,
            subject: "🔥 Login Page Project",
            html: `
                <html lang="en">
                    <body style="color: black">
                        <div class="col-12" style="background-color: #F8F8F8;">
                            <a href="http://brunocardosoferreira.com.br">
                                <img src="http://brunocardosoferreira.com.br/assets/img/angular.png" alt="logo"
                                style="display: block; margin:auto;">
                            </a>
                            <h2 style="text-align: center;">Olá, você solicitou uma troca de email no projeto login page!</h2>
                            <p style="text-align: center;">Acesse o link a seguir: <a href="http://localhost:4200/#/usuario/changeEmail/${link}">http://localhost:4200/#/usuario/changeEmail/${link}</a></p>

                            <p style="text-align: center;">&copy; 2020 <a
                            href="http://brunocardosoferreira.com.br">Login Page Project</a></p>
                        </div>
                    </body>
                </html>
            `,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.send(error);
            }
            console.log(info)
            return res.send(info);
        });
    }
}
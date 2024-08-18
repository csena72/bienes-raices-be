import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });


export const emailRegistro = async (nombre, email, token) => {

    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: 'Aplicacion Node.js',
        to: email,
        subject: 'Comprueba tu cuenta en bienesraices.com',
        text: 'Comprueba tu cuenta en bienesraices.com',
        html: `
            <p>Hola: ${nombre}, comprueba tu cuenta en bienesraices.com.</p>
            <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace: </p>

            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });

    console.log('Email enviado: %s', info.messageId);

}
import nodemailer from 'nodemailer';


export const emailRegistro = async ({nombre, email, token}) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: 'BienesRaices.com',
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
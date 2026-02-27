import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) => {
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const { email, nombre, token } = datos;

    // enviar email
    const info = await transport.sendMail({
        from: 'Administrador pacientes del veterinario',
        to: email,
        subject: 'Reestablece tu contraseña',
        text: 'Reestablece tu contraseña',
        html: `<p>Hola: ${nombre}, has solicitado reestablece tu contraseña.</p>
            <p>Sigue el siguiente enlace para la generacion de una nueva contraseña: 
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecerla</a></p>
            
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });
}

export default emailOlvidePassword;
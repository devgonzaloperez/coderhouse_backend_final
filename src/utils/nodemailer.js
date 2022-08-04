import { createTransport } from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

export const sendEmailToAdmin = async (userData) =>{

    const transporter = createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: process.env.USER_GMAIL,
            pass: process.env.PASSWORD_GMAIL //Se obtiene desde un link que hay en los docs de Nodemailer en la sección "using Gmail" en una parte que dice "Application Specific".
        },
        tls: {rejectUnauthorized: false}
    });

    const mailOptions = {
        from: process.env.USER_GMAIL,
        to: [process.env.USER_GMAIL], //Me lo autoenvío.
        subject: "Se ha registrado un usuario.",
        text: `Se ha registrado el usuario ${userData.userName}. Su nombre es ${userData.firstName} ${userData.lastName} y su dirección es ${userData.address}. El registro se ha realizado con el correo ${userData.email} y el teléfono ${userData.phone}.`
    };

    try{
        const response = await transporter.sendMail(mailOptions);
        console.log(response);
    }
    catch (error) {
        console.log(error);
    }

};
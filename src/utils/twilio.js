import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
    process.env.TWILIO_ASID,
    process.env.TWILIO_TOKEN    
);


export const sendWhatsAppToAdmin = async (productName) =>{

    const message = {
        body: `Hola. Le informamos que se ha agregado el producto ${productName} al stock.`,
        from: `whatsapp:${process.env.TWILIO_PHONE_WHATSAPP}`,
        to: "whatsapp:+34634422925"
    };

    try {
        const response = await client.messages.create(message);
    } 
    catch(error){
        console.log(error);
    }
};
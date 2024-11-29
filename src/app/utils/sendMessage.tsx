import axios from "axios";

export const sendMessage = (message: string): void => {
    const TOKEN: string = "7279545459:AAE1463p162oYPLd2SZqEjF9dEMVnM3_PO8";
    const CHAT_ID: string = "-1002240264675";
    const URL_API: string = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    
    axios
        .post(URL_API, {
            chat_id: CHAT_ID,
            parse_mode: "HTML",
            text: message,
        })
        .catch((err: any) => { 
            console.log(err); 
        });
};

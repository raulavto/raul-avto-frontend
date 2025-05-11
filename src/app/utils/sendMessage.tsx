import axios from 'axios';

export const sendMessage = (message: string): void => {
  // Старый бот
  const OLD_TOKEN: string = '7279545459:AAE1463p162oYPLd2SZqEjF9dEMVnM3_PO8';
  const OLD_CHAT_ID: string = '-1002240264675';
  const OLD_URL_API: string = `https://api.telegram.org/bot${OLD_TOKEN}/sendMessage`;

  // Новый бот
  const NEW_TOKEN: string = '7572384736:AAHN8zfgubSZz_4hcxkvb_mU5I6IwHniHfk';
  const NEW_CHAT_ID: string = '-1002488814082';
  const NEW_URL_API: string = `https://api.telegram.org/bot${NEW_TOKEN}/sendMessage`;

  // Отправка в старый чат
  axios
    .post(OLD_URL_API, {
      chat_id: OLD_CHAT_ID,
      parse_mode: 'HTML',
      text: message,
    })
    .catch((err: any) => {
      console.log('Ошибка отправки в старый чат:', err);
    });

  // Отправка в новый чат
  axios
    .post(NEW_URL_API, {
      chat_id: NEW_CHAT_ID,
      parse_mode: 'HTML',
      text: message,
    })
    .catch((err: any) => {
      console.log('Ошибка отправки в новый чат:', err);
    });
};

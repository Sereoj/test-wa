import { WhatsAppClient } from './clients/WhatsAppClient';
import { MessageService } from './services/MessageService';
import { MessageController } from './controllers/MessageController';

// //Для браузера
// const options = {
//     sessionFolder: 'sessions',
//     puppeteer: {
//         headless: false,
//         args: [
//             "--no-sandbox",
//             "--disable-setuid-sandbox",
//             "--disable-extensions",
//             "--disable-dev-shm-usage",
//             "--disable-accelerated-2d-canvas",
//             "--no-first-run",
//             "--no-zygote",
//             "--single-process",
//             "--disable-gpu",
//             "--disable-application-cache"
//         ]
//     }
// };


const options = {
    sessionFolder: 'sessions',
    headless: false,
    qrTimeoutMs: 30000,
    authTimeoutMs: 45000,
};

const client = new WhatsAppClient(options);
const messageService = new MessageService();
const messageController = new MessageController(client, messageService);

(async () => {
    try {
        await client.initialize();
    } catch (error) {
        console.error('Ошибка:', error);
    }
})();

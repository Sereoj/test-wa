import { Client, Message } from 'whatsapp-web.js';
import puppeteer from 'puppeteer';
import qrcode from 'qrcode-terminal';


interface WhatsAppClientOptions {
    sessionFolder?: string;
    headless?: boolean;
    qrTimeoutMs?: number;
    authTimeoutMs?: number;
}


export class WhatsAppClient {
    private client: Client;

    constructor(options: WhatsAppClientOptions = {}) {
        this.client = new Client(options);
        this.client.on('qr', (qr) => this.handleQRCode(qr));
        this.client.on('ready', () => console.log('Ready'));
        this.client.on('disconnected', (reason) => {
            console.error('Умер', reason);
            process.exit(1); // Перезапуск приложения, если требуется
        });
    }

    async initialize() {
        try {
            await this.client.initialize();
            console.log('Ок');
        } catch (error) {
            console.error('Не ок', error);
        }
    }

    private handleQRCode(qr: string) {
        qrcode.generate(qr, { small: true });
        console.log('Скан');
    }

/*    //Переназначение на кастомный
    private async handleQRCode(qr: string) {
        const browser = await puppeteer.launch({ headless: false }); // Открываем браузер (не в headless режиме)
        const page = await browser.newPage();

        //стырил
        const qrCodeHTML = `
            <html>
                <head><title>Тест</title></head>
                <body>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=300x300" alt="QR Code">
                </body>
            </html>
        `;

        await page.setContent(qrCodeHTML);
    }*/

    onMessage(callback: (message: Message) => void) {
        this.client.on('message', callback);
    }
}

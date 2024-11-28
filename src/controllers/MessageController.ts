import { WhatsAppClient } from '../clients/WhatsAppClient';
import { MessageService } from '../services/MessageService';
import {Message} from "whatsapp-web.js";

export class MessageController {
    private messageService: MessageService;

    constructor(client: WhatsAppClient, messageService: MessageService) {
        this.messageService = messageService;
        client.onMessage((message) => this.handleMessage(message));
    }

    private async handleMessage(message: Message) {
        const response = await this.messageService.processMessage(message.body);
        if (response) {
            await message.reply(response);
        }
    }
}

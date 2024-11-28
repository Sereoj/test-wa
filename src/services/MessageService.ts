export class MessageService {
    async processMessage(message: string): Promise<string | null> {
        if (message.toLowerCase() === 'привет') {
            return 'Привет! Как я могу помочь?';
        }
        return 'Извините, я вас не понял.';
    }
}

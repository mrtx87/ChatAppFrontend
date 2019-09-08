import { ChatMessage } from './chat.message';
import { User } from './user';

export class Chatroom {

    id: string;
    name: string;
    chatMessages: ChatMessage[];
    users: string[];
    iconUrl: string;
}
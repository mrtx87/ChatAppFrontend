import { ChatMessage } from './chat.message';
import { User } from './user';

export class ChatRoom {

    id: string;
    title: string;
    chatMessages: ChatMessage[];
    userIds: string[];
    iconUrl: string;


}
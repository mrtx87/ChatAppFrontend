import { ChatMessage } from './chat.message';
import { User } from './user';

export class Chatroom {

    id: string;
    name: string;
    chatMessages: ChatMessage[];
    users: string[];
    iconUrl: string;

    public static createRandom() : Chatroom {
        let chatroom: Chatroom = new Chatroom();
        chatroom.id = 'dfsfsdggrgsefes';
        chatroom.name = "Testuser" + Math.floor(Math.random() * 100);
        chatroom.iconUrl = "assets/testicon.png";
        return chatroom;
    }
}
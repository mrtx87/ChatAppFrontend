import { ChatMessage } from './chat.message';
import { User } from './user';

export class ChatRoom {

    id: string;
    title: string;
    userIds: string[];
    iconUrl: string;
    groupChat: boolean;

    //ONLY FRONTEND
    unseenChatMessageIds: string[];
    oldestUnseenMessage: ChatMessage;
    

}
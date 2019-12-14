import { User } from './user';
import { Contact } from './contact';
import { ChatMessage } from './chat.message';
import { ChatRoom } from './chat.room';

export class DataTransferContainer {
    function: string;
    from: Contact;
    chatRoomId: string;
    chatRoom: ChatRoom;
    chatMessage: ChatMessage;
    chatMessages: ChatMessage[];
    contactsList: Contact[];
    unseenChatMessageIds: string[];
    cookie: string;

}
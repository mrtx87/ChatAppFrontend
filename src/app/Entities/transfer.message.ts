import { User } from './user';
import { Contact } from './contact';
import { ChatMessage } from './chat.message';
import { ChatRoom } from './chat.room';

export class TransferMessage {
    function: string;
    from: Contact;
    chatRoomId: string;
    chatRoom: ChatRoom;
    chatMessage: ChatMessage;
    contactsList: Contact[];
    unseenChatMessageIds: string[];

}
import { User } from './user';

export class TransferMessage {
    type: string;
    from: User;
    chatroomId: string;
    body: string
}
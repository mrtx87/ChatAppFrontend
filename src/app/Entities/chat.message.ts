export class ChatMessage {
    id: string;
	roomId: string;

	fromId: string;
	body: string;
	createdAt: string;
	
	seen: boolean;
	searchBody: string;
	highlightedSearchBody: string;
}
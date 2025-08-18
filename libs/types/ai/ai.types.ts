export interface ChatMessageInput {
	system?: string;
	historyUser?: string[];
	historyAssistant?: string[];
	message: string;
	model?: string;
}

export interface ChatReply {
	text: string;
}

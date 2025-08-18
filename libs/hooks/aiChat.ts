import { gql, useMutation } from '@apollo/client';

const CHAT = gql`
	mutation Chat($input: ChatMessageInput!) {
		chat(input: $input) {
			text
		}
	}
`;

export function useChat() {
	const [send, { data, loading, error }] = useMutation(CHAT);
	return { send, data, loading, error };
}

// 'use client';
// import { useState } from 'react';
// import { useChat } from '../hooks/aiChat';

// export default function ChatBox() {
// 	const [input, setInput] = useState('');
// 	const [historyUser, setHU] = useState<string[]>([]);
// 	const [historyAssistant, setHA] = useState<string[]>([]);
// 	const { send, data, loading } = useChat();

// 	async function onSend(e: React.FormEvent) {
// 		e.preventDefault();
// 		const userMsg = input.trim();
// 		if (!userMsg) return;
// 		const res = await send({
// 			variables: {
// 				input: {
// 					system: 'You are a helpful, concise assistant.',
// 					historyUser,
// 					historyAssistant,
// 					message: userMsg,
// 					model: 'gpt-5-mini',
// 				},
// 			},
// 		});
// 		const ai = res.data?.chat?.text ?? '';
// 		setHU((prev) => [...prev, userMsg]);
// 		setHA((prev) => [...prev, ai]);
// 		setInput('');
// 	}

// 	return (
// 		<div style={{ maxWidth: 720, margin: '2rem auto' }}>
// 			<div style={{ border: '1px solid #eee', padding: 16, minHeight: 240 }}>
// 				{historyUser.map((u, i) => (
// 					<div key={i}>
// 						<p>
// 							<b>You:</b> {u}
// 						</p>
// 						<p>
// 							<b>AI:</b> {historyAssistant[i]}
// 						</p>
// 					</div>
// 				))}
// 			</div>
// 			<form onSubmit={onSend} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
// 				<input
// 					value={input}
// 					onChange={(e) => setInput(e.target.value)}
// 					placeholder="Ask me anything…"
// 					style={{ flex: 1 }}
// 				/>
// 				<button disabled={loading}>{loading ? '…' : 'Send'}</button>
// 			</form>
// 		</div>
// 	);
// }

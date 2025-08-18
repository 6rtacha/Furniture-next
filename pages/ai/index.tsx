'use client';
import { useState, useRef, useEffect } from 'react';
import { useChat } from '../../libs/hooks/aiChat';
import withLayoutFull from '../../libs/components/layout/LayoutFull';

const ChatBox = () => {
	const [input, setInput] = useState('');
	const [history, setHistory] = useState<{ user: string; ai: string; time: string }[]>([]);
	const { send, loading } = useChat();
	const containerRef = useRef<HTMLDivElement>(null);

	// Auto-scroll when new message comes
	useEffect(() => {
		containerRef.current?.scrollTo({
			top: containerRef.current.scrollHeight,
			behavior: 'smooth',
		});
	}, [history, loading]);

	async function onSend(e: React.FormEvent) {
		e.preventDefault();
		const message = input.trim();
		if (!message) return;

		const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		setHistory((prev) => [...prev, { user: message, ai: '…', time }]);
		setInput('');

		try {
			const res = await send({
				variables: {
					input: {
						system: 'You are a friendly, concise assistant.',
						historyUser: history.map((h) => h.user),
						historyAssistant: history.map((h) => h.ai),
						message,
						model: 'gpt-5-mini',
					},
				},
			});

			const aiResponse = res.data?.chat?.text ?? 'Sorry, I could not respond.';
			setHistory((prev) => prev.map((h, i) => (i === prev.length - 1 ? { ...h, ai: aiResponse } : h)));
		} catch (err) {
			setHistory((prev) => prev.map((h, i) => (i === prev.length - 1 ? { ...h, ai: 'Error occurred.' } : h)));
			console.error(err);
		}
	}

	return (
		<div className={'chatContainer'}>
			<div ref={containerRef} className={'messageContainer'}>
				{history.map((h, i) => (
					<div key={i} className={'message'}>
						<div className={'userMessage'}>
							<div className={'messageContent'}>
								<b>You:</b> {h.user}
								<span className={'timestamp'}>{h.time}</span>
							</div>
						</div>
						<div className={'aiMessage'}>
							<div className={'messageContent'}>
								<b>AI:</b>{' '}
								{h.ai === '…' ? (
									<span className={'loadingDots'}>
										<span></span>
										<span></span>
										<span></span>
									</span>
								) : (
									h.ai
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			<form onSubmit={onSend} className={'form'}>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Ask me anything…"
					className={'input'}
				/>
				<button type="submit" disabled={loading || !input.trim()} className={'button'}>
					{loading ? '…' : 'Send'}
				</button>
			</form>
		</div>
	);
};

export default withLayoutFull(ChatBox);

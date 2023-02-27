import React, { ChangeEvent, useState } from "react";

function ChatApp() {
	const [message, setMessage] = useState<string>("");
	const [response, setResponse] = useState<string>("");

	const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value);
	};

	const handleSendMessage = () => {
		fetch("/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer ",
			},
			body: JSON.stringify({
				id: "cmpl-GERzeJQ4lvqPk8SkZu4XMIuR",
				object: "text_completion",
				created: 1586839808,
				model: "text-davinci:003",
				choices: [
					{
						text: "\n\nThis is indeed a test",
						index: 0,
						logprobs: null,
						finish_reason: "length",
					},
				],
				usage: {
					prompt_tokens: 5,
					completion_tokens: 7,
					total_tokens: 12,
				},
			}),
		})
			.then((response) => response.json())
			.then((data) => setResponse(data.response))
			.catch((error) => console.error(error));
	};

	return (
		<div>
			<input type="text" value={message} onChange={handleMessageChange} />
			<button onClick={handleSendMessage}>Send</button>
			{response && <p>{response}</p>}
		</div>
	);
}

export default ChatApp;

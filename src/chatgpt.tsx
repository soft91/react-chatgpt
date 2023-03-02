import React, { ChangeEvent, useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	// apiKey: process.env.REACT_APP_OPENAPI_KEY,
	apiKey: process.env.REACT_APP_OPENAPI_KEY,
});

const openai = new OpenAIApi(configuration);

function ChatApp() {
	const [message, setMessage] = useState<string>("");
	const [response, setResponse] = useState<string>("");
	const [option, setOption] = useState({
		model: "text-davinci-003",
		temperature: 0,
		max_tokens: 64,
		top_p: 1.0,
		frequency_penalty: 0.0,
		presence_penalty: 0.0,
		//stop: ["\n"],
	});

	const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value);
	};

	const doStuff = async () => {
		let object = {
			...option,
			prompt: message,
		};

		const response = await openai.createCompletion(object);

		setResponse(response.data.choices[0].text as string);
	};

	useEffect(() => {
		console.log(configuration.apiKey);
	}, []);

	return (
		<div>
			<input type="text" value={message} onChange={handleMessageChange} />
			<button onClick={doStuff}>Send</button>
			{response && <p>{response}</p>}
		</div>
	);
}

export default ChatApp;

import { GoogleGenerativeAI } from '@google/generative-ai';
import { SECRET_GEMINI_API_KEY } from '$env/static/private';

export const GET = async ({ url }) => {
	const input = url.searchParams.get('input');

	const prompt = `this is a spell check generator. It can't recieve offensive languege, (explicit racism, xenofobia and religion. Anything else its fine.)
    --
    If the sample received contains explicitly: "niga, veneco, something xenofobic or religious offensive". Anything else its fine.
    you will display: "No uses ninguna palabra ofensiva"
    --
    You have to be aware of todays slang in the united states and united kingdom, aware of memes and the way young and older people talk.
    Be aware that words like bro, lad, pal, homie, are english slang, therefore they are words.
    --
    Words that were spelled badly like anoying for "annoying", mai for "my" bru for "bro", vlu or vlue for "blue", etc are the kind of mispelled words that resamble english therefor it can be corrected.
    --
    Ultimetly, show me only the response, without any punctation mark added.
    --
    Incorrect sample: "I are good."
    Correct sample: "I am good."
    --
    Incorrect sample: "I have 22 years old."
    Correct sample: "I am 22 years old."
    --
    Incorrect sample: "I don't can know."
    Correct sample: "I don't know."
    --
    Incorrect sample: "His determination make he a great leader."
    Correct sample: "His determination makes him a great leader."
    --
    Incorrect sample: "She had went to the store yesterday."
    Correct sample: "She had gone to the store yesterday."
    --
    Incorrect sample: "Their is three cats in the backyard."
    Correct sample: "There are three cats in the backyard."
    --
    Incorrect sample: "I seen the movie last night."
    Correct sample: "I saw the movie last night."
    --
    Incorrect sample: "She walk to the park every morning."
    Correct sample: "She walks to the park every morning."
    --
    Incorrect sample: "My neighborhord is so noici."
    Correct sample: "My neighborhood is so noisy."
    --
    Incorrect sample: "${input}"
    Correct sample:
    `;

	const genAi = new GoogleGenerativeAI(SECRET_GEMINI_API_KEY);

	const model = genAi.getGenerativeModel({
		model: 'gemini-1.5-pro-exp-0827'
	});

	const result = await model.generateContent(prompt);
	return new Response(
		JSON.stringify({
			response: `${result.response.candidates[0].content.parts[0].text}`
		}),
		{ status: 200 }
	);
};

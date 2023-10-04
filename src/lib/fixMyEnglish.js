import { PUBLIC_COHERE_API_KEY } from '$env/static/public'

const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate'

export async function fixMyEnglish(input){
  const data = {
   prompt: `this is a spell check generator.
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
    Incorrect sample: "${input}"
    Correct sample:
    `,
    max_tokens: 40,
    temperature: 0.3,
    k: 0,
    p: 1,
    stop_sequences: ["--"],
    return_likelihoods: 'NONE'
  }
  const response = await fetch(COHERE_API_GENERATE_URL, {
    method: 'POST',
    headers: {
      Authorization: `BEARER ${PUBLIC_COHERE_API_KEY}`,
      'Content-Type': 'application/json',
      'Cohere-Version': '2022-12-06'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
  console.log(response)
  const { text } = response.generations[0]

  return text
  
}
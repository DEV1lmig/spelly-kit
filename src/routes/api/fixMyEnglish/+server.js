import cohere from 'cohere-ai'
import { SECRET_COHERE_API_KEY } from '$env/static/private'

export const GET = async ({ url }) => {
  const input = url.searchParams.get('input')

  cohere.init(SECRET_COHERE_API_KEY)

  const cohereGeneration = await cohere.generate({
    prompt: `this is a spell check generator. It can't recieve offensive languege, (racism, xenofobia and religion)
    --
    If the sample received contains: "niga, something xenofobic or religious offensive"
    you will display: "No uses ninguna palabra ofensiva"
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
    `,
    max_tokens: 50,
    temperature: 0.3,
    k: 0,
    p: 1,
    stop_sequences: ["--"],
    return_likelihoods: 'NONE'
  })
  
  console.log(cohereGeneration.body)
  if(cohereGeneration.body.generations) {
    const cohereResponseText = cohereGeneration.body.generations[0].text
    const formattedResponse = cohereResponseText.replace('--', '').replaceAll('"', '').trim()
    return new Response(JSON.stringify({
      response: `${ formattedResponse }.\n`
    }), { status: 200 })
  }else {
    return new Response(JSON.stringify({
      response: 'Aparentemente usaste mucho la app y la sobrecargaste... o usas palabras que no debes 🤨'
    }), { status: 429 })
  }
}